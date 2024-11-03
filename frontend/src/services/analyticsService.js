
// Analytics Service
// src/services/analyticsService.js
const getStudentAnalytics = async (timeframe = '30d') => {
    const date = new Date();
    date.setDate(date.getDate() - parseInt(timeframe));
  
    const studentStats = await User.aggregate([
      { $match: { role: 'student', createdAt: { $gte: date } } },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id': 1 } }
    ]);
  
    return studentStats;
  };
  
  const getUserActivityStats = async () => {
    const stats = await ActivityLog.aggregate([
      {
        $group: {
          _id: '$action',
          count: { $sum: 1 },
          uniqueUsers: { $addToSet: '$user' }
        }
      }
    ]);
  
    return stats.map(stat => ({
      action: stat._id,
      count: stat.count,
      uniqueUsers: stat.uniqueUsers.length
    }));
  };