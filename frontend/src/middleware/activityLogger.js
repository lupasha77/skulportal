// Activity Logging Middleware
// src/middleware/activityLogger.js
const logActivity = async (userId, action, details = {}, req) => {
    try {
      await ActivityLog.create({
        user: userId,
        action,
        details,
        ipAddress: req.ip,
        userAgent: req.headers['user-agent']
      });
    } catch (error) {
      console.error('Activity logging failed:', error);
    }
  };
  
  // Password Recovery System
  // src/routes/auth.js
  router.post('/forgot-password', async (req, res) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Generate reset token
      const resetToken = crypto.randomBytes(32).toString('hex');
      user.resetPasswordToken = resetToken;
      user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
      await user.save();
  
      // Send reset email
      const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
      await transporter.sendMail({
        to: user.email,
        subject: 'Password Reset Request',
        html: `
          <h1>Password Reset Request</h1>
          <p>Click the link below to reset your password:</p>
          <a href="${resetUrl}">Reset Password</a>
          <p>This link will expire in 1 hour.</p>
          <p>If you didn't request this, please ignore this email.</p>
        `
      });
  
      await logActivity(user._id, 'password_reset_requested', {}, req);
      res.json({ message: 'Password reset email sent' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  router.post('/reset-password/:token', async (req, res) => {
    try {
      const { password } = req.body;
      const user = await User.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: { $gt: Date.now() }
      });
  
      if (!user) {
        return res.status(400).json({ message: 'Invalid or expired reset token' });
      }
  
      user.password = password;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();
  
      await logActivity(user._id, 'password_reset_completed', {}, req);
      res.json({ message: 'Password reset successful' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  