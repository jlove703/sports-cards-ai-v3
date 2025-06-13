'use client'

import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Target, AlertCircle, Activity, Star, ShoppingCart } from 'lucide-react';

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Mock data - this will be replaced by your N8N workflows
  const portfolioData = [
    { date: 'Jan', value: 12500 },
    { date: 'Feb', value: 13200 },
    { date: 'Mar', value: 12800 },
    { date: 'Apr', value: 14100 },
    { date: 'May', value: 15300 },
    { date: 'Jun', value: 16750 }
  ];

  const topMovers = [
    { name: 'Connor Bedard RC PSA 10', change: 15.5, value: 2850, trend: 'up' },
    { name: 'Victor Wembanyama RC BGS 9.5', change: 12.3, value: 1900, trend: 'up' },
    { name: 'CJ Stroud Prizm RC PSA 10', change: -8.2, value: 890, trend: 'down' },
    { name: 'Anthony Richardson RC PSA 9', change: 9.7, value: 340, trend: 'up' }
  ];

  const buyAlerts = [
    { card: 'Jayden Daniels Prizm RC PSA 10', reason: '25% below peak', opportunity: 'Strong Buy' },
    { card: 'Caleb Williams Draft RC BGS 9.5', reason: 'Rookie season upside', opportunity: 'Buy' },
    { card: 'Bo Nix Prizm RC Raw', reason: 'Grading opportunity', opportunity: 'Spec Buy' }
  ];

  const portfolioBreakdown = [
    { name: 'Football', value: 45, color: '#8884d8' },
    { name: 'Basketball', value: 30, color: '#82ca9d' },
    { name: 'Baseball', value: 20, color: '#ffc658' },
    { name: 'Hockey', value: 5, color: '#ff7300' }
  ];

  const agentStatus = {
    lastRun: '2 minutes ago',
    status: 'Active',
    alertsToday: 7,
    opportunitiesFound: 3
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Sports Card Agent Dashboard
          </h1>
          <p className="text-gray-300 mt-2">
            AI-Powered Investment Intelligence • {currentTime.toLocaleString()}
          </p>
        </div>

        {/* Agent Status Widget */}
        <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-xl p-6 mb-6 border border-green-500/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <h2 className="text-xl font-semibold">Sports Card Agent</h2>
              <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">
                {agentStatus.status}
              </span>
            </div>
            <div className="text-right">
              <p className="text-gray-300">Last run: {agentStatus.lastRun}</p>
              <p className="text-sm text-gray-400">Next scan in 1 hour</p>
            </div>
          </div>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Portfolio Value</p>
                <p className="text-2xl font-bold text-green-400">$16,750</p>
                <p className="text-sm text-green-300">+$1,450 this month</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-400" />
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Break-Even Status</p>
                <p className="text-2xl font-bold text-blue-400">78%</p>
                <p className="text-sm text-blue-300">$3,670 to break-even</p>
              </div>
              <Target className="w-8 h-8 text-blue-400" />
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Cool Factor</p>
                <p className="text-2xl font-bold text-purple-400">9.2/10</p>
                <p className="text-sm text-purple-300">Amazing collection!</p>
              </div>
              <Star className="w-8 h-8 text-purple-400" />
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Active Alerts</p>
                <p className="text-2xl font-bold text-orange-400">{agentStatus.alertsToday}</p>
                <p className="text-sm text-orange-300">{agentStatus.opportunitiesFound} opportunities</p>
              </div>
              <AlertCircle className="w-8 h-8 text-orange-400" />
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Portfolio Chart */}
          <div className="lg:col-span-2 bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-blue-400" />
              Portfolio Performance
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={portfolioData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Portfolio Breakdown */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <h3 className="text-xl font-semibold mb-4">Sports Breakdown</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={portfolioBreakdown}
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {portfolioBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {portfolioBreakdown.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <span className="text-sm font-semibold">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Movers */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
              Top Movers (24h)
            </h3>
            <div className="space-y-4">
              {topMovers.map((card, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{card.name}</p>
                    <p className="text-xs text-gray-400">${card.value.toLocaleString()}</p>
                  </div>
                  <div className={`flex items-center ${card.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                    {card.trend === 'up' ? 
                      <TrendingUp className="w-4 h-4 mr-1" /> : 
                      <TrendingDown className="w-4 h-4 mr-1" />
                    }
                    <span className="font-semibold">
                      {card.change > 0 ? '+' : ''}{card.change}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Buy Alerts */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <ShoppingCart className="w-5 h-5 mr-2 text-yellow-400" />
              AI Buy Alerts
            </h3>
            <div className="space-y-4">
              {buyAlerts.map((alert, index) => (
                <div key={index} className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-sm text-yellow-300">{alert.card}</p>
                      <p className="text-xs text-gray-400 mt-1">{alert.reason}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      alert.opportunity === 'Strong Buy' ? 'bg-green-500/20 text-green-300' :
                      alert.opportunity === 'Buy' ? 'bg-blue-500/20 text-blue-300' :
                      'bg-purple-500/20 text-purple-300'
                    }`}>
                      {alert.opportunity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Powered by N8N Workflows • Data updated every 15 minutes</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
