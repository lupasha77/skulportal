// Analytics Dashboard Component
// src/components/admin/AnalyticsDashboard.jsx
import { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Select,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const AnalyticsDashboard = () => {
  const [timeframe, setTimeframe] = useState('30d');
  const [stats, setStats] = useState({
    studentGrowth: [],
    activityStats: [],
    userStats: {}
  });

  const fetchAnalytics = async () => {
    try {
      const [studentData, activityData, userData] = await Promise.all([
        fetch(`/api/analytics/students?timeframe=${timeframe}`),
        fetch('/api/analytics/activity'),
        fetch('/api/analytics/users')
      ]);

      const [studentStats, activityStats, userStats] = await Promise.all([
        studentData.json(),
        activityData.json(),
        userData.json()
      ]);

      setStats({
        studentGrowth: studentStats,
        activityStats,
        userStats
      });
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [timeframe]);

  return (
    <Box p={8}>
      <Grid templateColumns="repeat(3, 1fr)" gap={6} mb={8}>
        <Stat>
          <StatLabel>Total Users</StatLabel>
          <StatNumber>{stats.userStats.totalUsers}</StatNumber>
          <StatHelpText>Active users: {stats.userStats.activeUsers}</StatHelpText>
        </Stat>
        <Stat>
          <StatLabel>Parent-Student Ratio</StatLabel>
          <StatNumber>
            {(stats.userStats.parentCount / stats.userStats.studentCount).toFixed(2)}
          </StatNumber>
          <StatHelpText>
            {stats.userStats.parentCount} parents / {stats.userStats.studentCount} students
          </StatHelpText>
        </Stat>
        <Stat>
          <StatLabel>Verification Rate</StatLabel>
          <StatNumber>
            {((stats.userStats.verifiedUsers / stats.userStats.totalUsers) * 100).toFixed(1)}%
          </StatNumber>
        </Stat>
      </Grid>

      <Box mb={8}>
        <Select value={timeframe} onChange={(e) => setTimeframe(e.target.value)} mb={4}>
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
        </Select>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={stats.studentGrowth}>
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </Box>

      {/* Activity Log Table Component */}
      <ActivityLogTable />
    </Box>
  );
};

// Activity Log Table Component
const ActivityLogTable = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLogs = async () => {
    try {
      const response = await fetch('/api/admin/activity-logs');
      const data = await response.json();
      setLogs(data);
    } catch (error) {
      console.error('Failed to fetch logs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>User</Th>
          <Th>Action</Th>
          <Th>IP Address</Th>
          <Th>Timestamp</Th>
        </Tr>
      </Thead>
      <Tbody>
        {logs.map(log => (
          <Tr key={log._id}>
            <Td>{log.user.firstName} {log.user.lastName}</Td>
            <Td>{log.action}</Td>
            <Td>{log.ipAddress}</Td>
            <Td>{new Date(log.timestamp).toLocaleString()}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};