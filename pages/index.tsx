'use client'

import React, { useState, useEffect } from 'react';
import { DollarSign, Target, Star, AlertCircle, TrendingUp, ShoppingCart } from 'lucide-react';

export default function Home() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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

        {/* AI Agent Status Widget */}
        <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-xl p-6 mb-6 border border-green-500/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <h2 className="text-xl font-semibold">Sports Card Agent</h2>
              <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">
                Active
              </span>
            </div>
            <div className="text-right">
              <p className="text-gray-300">Last run: 2 minutes ago</p>
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
                <p className="text-2xl font-bold text-orange-400">7</p>
                <p className="text-sm text-orange-300">3 opportunities</p>
              </div>
              <AlertCircle className="w-8 h-8 text-orange-400" />
            </div>
          </div>
        </div>

        {/* Sports Card Data Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Top Movers */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
              Top Movers (24h)
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-sm">Connor Bedard RC PSA 10</p>
                  <p className="text-xs text-gray-400">$2,850</p>
                </div>
                <div className="flex items-center text-green-400">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span className="font-semibold">+15.5%</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-sm">Victor Wembanyama RC BGS 9.5</p>
                  <p className="text-xs text-gray-400">$1,900</p>
                </div>
                <div className="flex items-center text-green-400">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span className="font-semibold">+12.3%</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-sm">CJ Stroud Prizm RC PSA 10</p>
                  <p className="text-xs text-gray-400">$890</p>
                </div>
                <div className="flex items-center text-red-400">
                  <TrendingUp className="w-4 h-4 mr-1 rotate-180" />
                  <span className="font-semibold">-8.2%</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-sm">Anthony Richardson RC PSA 9</p>
                  <p className="text-xs text-gray-400">$340</p>
                </div>
                <div className="flex items-center text-green-400">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span className="font-semibold">+9.7%</span>
                </div>
              </div>
            </div>
          </div>

          {/* AI Buy Alerts */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <ShoppingCart className="w-5 h-5 mr-2 text-yellow-400" />
              AI Buy Alerts
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-sm text-yellow-300">Jayden Daniels Prizm RC PSA 10</p>
                    <p className="text-xs text-gray-400 mt-1">25% below peak</p>
                  </div>
                  <span className="px-2 py-1 rounded text-xs font-semibold bg-green-500/20 text-green-300">
                    Strong Buy
                  </span>
                </div>
              </div>
              <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-sm text-yellow-300">Caleb Williams Draft RC BGS 9.5</p>
                    <p className="text-xs text-gray-400 mt-1">Rookie season upside</p>
                  </div>
                  <span className="px-2 py-1 rounded text-xs font-semibold bg-blue-500/20 text-blue-300">
                    Buy
                  </span>
                </div>
              </div>
              <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-sm text-yellow-300">Bo Nix Prizm RC Raw</p>
                    <p className="text-xs text-gray-400 mt-1">Grading opportunity</p>
                  </div>
                  <span className="px-2 py-1 rounded text-xs font-semibold bg-purple-500/20 text-purple-300">
                    Spec Buy
                  </span>
                </div>
              </div>
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
}
