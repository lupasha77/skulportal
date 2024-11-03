// Analytics API Routes
// src/routes/analytics.js
router.get('/students', protect, adminOnly, async (req, res) => {
    try {
      const stats = await getStudentAnalytics(req.query.timeframe);
      res.json(stats);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  router.get('/activity', protect, adminOnly, async (req, res) => {
    try {
      const stats = await getUserActivityStats();
      res.json(stats);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  router.get('/users', protect, adminOnly, async (req, res) => {
    try {
      const [totalUsers, activeUsers, verifiedUsers, parentCount, studentCount] = await Promise.all([
        User.countDocuments(),
        ActivityLog.distinct('user', { 
          timestamp: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
        }),
        User.countDocuments({ isVerified: true }),
        User.countDocuments({ role: 'parent' }),
        User.countDocuments({ role: 'student' })
      ]);
  
      res.json({
        totalUsers,
        activeUsers: activeUsers.length,
        verifiedUsers,
        parentCount,
        studentCount
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });