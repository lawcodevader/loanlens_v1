import { useState } from 'react';
import { BarChart3, TrendingUp, Users, FileCheck, AlertTriangle } from 'lucide-react';

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('7d');

  const stats = [
    {
      title: 'Total Verifications',
      value: '2,345',
      change: '+12.5%',
      trend: 'up',
      icon: <BarChart3 className="h-6 w-6 text-primary" />,
    },
    {
      title: 'Pending Reviews',
      value: '145',
      change: '-3.2%',
      trend: 'down',
      icon: <FileCheck className="h-6 w-6 text-primary" />,
    },
    {
      title: 'Active Users',
      value: '847',
      change: '+5.8%',
      trend: 'up',
      icon: <Users className="h-6 w-6 text-primary" />,
    },
    {
      title: 'Success Rate',
      value: '94.2%',
      change: '+0.8%',
      trend: 'up',
      icon: <TrendingUp className="h-6 w-6 text-primary" />,
    },
  ];

  const recentAlerts = [
    {
      id: 1,
      message: 'High volume of pending verifications in Maharashtra region',
      type: 'warning',
      time: '2 hours ago',
    },
    {
      id: 2,
      message: 'System maintenance scheduled for tonight at 2 AM IST',
      type: 'info',
      time: '5 hours ago',
    },
    {
      id: 3,
      message: 'New compliance requirements updated for Karnataka region',
      type: 'warning',
      time: '1 day ago',
    },
  ];

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="input max-w-[120px]"
        >
          <option value="24h">Last 24h</option>
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                {stat.icon}
              </div>
              <span className={`text-sm font-medium ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
            <p className="text-2xl font-bold mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Verification Status</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Completed</span>
                <span>75%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-green-500 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>In Progress</span>
                <span>15%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-blue-500 rounded-full" style={{ width: '15%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Pending</span>
                <span>10%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-yellow-500 rounded-full" style={{ width: '10%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Recent Alerts</h2>
          <div className="space-y-4">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className="flex items-start space-x-3">
                <div className={`mt-0.5 p-1 rounded-full ${
                  alert.type === 'warning' ? 'bg-yellow-100' : 'bg-blue-100'
                }`}>
                  <AlertTriangle className={`h-4 w-4 ${
                    alert.type === 'warning' ? 'text-yellow-600' : 'text-blue-600'
                  }`} />
                </div>
                <div>
                  <p className="text-sm text-gray-800">{alert.message}</p>
                  <span className="text-xs text-gray-500">{alert.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;