import { Router } from 'express';
const router = Router();
import { verify } from 'jsonwebtoken';
import { findOneAndUpdate } from '../models/User'; // Adjust the path based on your project

router.get('/verify-email', async (req, res) => {
  const { token } = req.query;  // The token from the verification link

  if (!token) {
    return res.status(400).json({ message: 'Token is missing' });
  }

  try {
    // Verify the token using JWT
    const decoded = verify(token, process.env.JWT_SECRET);

    // Find the user and mark as verified
    const user = await findOneAndUpdate({ email: decoded.email }, { isVerified: true });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // If successful, redirect the user to the dashboard
    res.redirect('/dashboard');  // Redirect to the parent dashboard (or another route as needed)

  } catch (error) {
    return res.status(400).json({ message: 'Invalid or expired token' });
  }
});

export default router;
