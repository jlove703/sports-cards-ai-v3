'use client'
import React, { useState, useEffect } from 'react';
import { DollarSign, Target, Star, AlertCircle, RefreshCw } from 'lucide-react';

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [cardData, setCardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch card data from API
  useEffect(() => {
    fetchCardData();
    // Refresh data every 5 minutes
    const dataRefresh = setInterval(fetchCardData, 5 * 60 * 1000);
    return () => clearInterval(dataRefresh);
  }, []);

  const fetchCardData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // This should match your N8N webhook endpoint
      const response = await fetch('/api/get-card-data');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setCardData(data);
    } catch (err) {
      console.error('Error fetching card data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const manualRefresh = () => {
    fetchCardData();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Sports Card Agent Dashboard
            </h1>
            <p className="text-gray-300 mt-2">
              AI-Powered Investment Intelligence • {currentTime.toLocaleString()}
            </p>
          </div>
          <button
            onClick={manualRefresh}
            disabled={loading}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 px-4 py-2 rounded-lg transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh Data
          </button>
        </div>

        {/* Status Indicator */}
        <div className="mb-6">
          {loading && (
            <div className="bg-yellow-900/30 border border-yellow-600 rounded-lg p-3 flex items-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Loading card data...</span>
            </div>
          )}
          {error && (
            <div className="bg-red-900/30 border border-red-600 rounded-lg p-3 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              <span>Error: {error}</span>
            </div>
          )}
          {cardData && !loading && (
            <div className="bg-green-900/30 border border-green-600 rounded-lg p-3 flex items-center gap-2">
              <Star className="w-4 h-4" />
              <span>Data loaded successfully • Last updated: {new Date(cardData.lastUpdated || Date.now()).toLocaleString()}</span>
            </div>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Portfolio Value</p>
                <p className="text-2xl font-bold text-green-400">
                  ${cardData?.portfolioValue || '16,750'}
                </p>
                <p className="text-sm text-green-300">
                  +${cardData?.monthlyGain || '1,450'} this month
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-green-400" />
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Hot Cards Found</p>
                <p className="text-2xl font-bold text-blue-400">
                  {cardData?.hotCardsCount || '7'}
                </p>
                <p className="text-sm text-blue-300">
                  {cardData?.newCardsToday || '3'} new today
                </p>
              </div>
              <Target className="w-8 h-8 text-blue-400" />
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Avg. ROI</p>
                <p className="text-2xl font-bold text-purple-400">
                  {cardData?.avgROI || '34'}%
                </p>
                <p className="text-sm text-purple-300">
                  {cardData?.roiTrend || '+5'}% vs last month
                </p>
              </div>
              <Star className="w-8 h-8 text-purple-400" />
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Active Alerts</p>
                <p className="text-2xl font-bold text-orange-400">
                  {cardData?.activeAlerts || '2'}
                </p>
                <p className="text-sm text-orange-300">
                  {cardData?.urgentAlerts || '1'} urgent
                </p>
              </div>
              <AlertCircle className="w-8 h-8 text-orange-400" />
            </div>
          </div>
        </div>

        {/* MLB Performance Alerts */}
        {cardData?.mlbAlerts && (
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 mb-8">
            <h2 className="text-xl font-bold mb-4">🔥 MLB Performance Alerts</h2>
            <div className="space-y-3">
              {cardData.mlbAlerts.slice(0, 5).map((alert, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-orange-900/20 border border-orange-600/30 rounded-lg">
                  <div>
                    <p className="font-medium text-orange-300">{alert.player || `Player ${index + 1}`}</p>
                    <p className="text-sm text-gray-400">{alert.performance || 'No performance data'}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-orange-400 font-bold">{alert.impact || 'Card impact unknown'}</p>
                    <p className="text-sm text-gray-400">{alert.timestamp || 'Unknown time'}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Card Analysis */}
        {cardData?.recentCards && (
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 mb-8">
            <h2 className="text-xl font-bold mb-4">⚾ Cards Impacted by MLB Performance</h2>
            <div className="space-y-3">
              {cardData.recentCards.slice(0, 5).map((card, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg">
                  <div>
                    <p className="font-medium">{card.name || `Card ${index + 1}`}</p>
                    <p className="text-sm text-gray-400">{card.mlbTrigger || card.description || 'No MLB trigger data'}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${card.priceChange?.startsWith('+') ? 'text-green-400' : card.priceChange?.startsWith('-') ? 'text-red-400' : 'text-white'}`}>
                      ${card.price || 'N/A'} <span className="text-sm">({card.priceChange || '0%'})</span>
                    </p>
                    <p className="text-sm text-gray-400">{card.timestamp || 'Unknown time'}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Top MLB Performers */}
        {cardData?.topPerformers && (
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 mb-8">
            <h2 className="text-xl font-bold mb-4">🏆 Top MLB Performers (Card Opportunities)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cardData.topPerformers.slice(0, 6).map((player, index) => (
                <div key={index} className="p-4 bg-blue-900/20 border border-blue-600/30 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-medium text-blue-300">{player.name || `Player ${index + 1}`}</p>
                    <span className="text-xs bg-blue-600 px-2 py-1 rounded">{player.position || 'Unknown'}</span>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">{player.stats || 'No stats available'}</p>
                  <p className="text-green-400 text-sm font-medium">{player.cardOpportunity || 'Card opportunity unknown'}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Debug Info (remove in production) */}
        {cardData && (
          <div className="bg-gray-800/30 rounded-lg p-4 mt-8 border border-gray-600">
            <h3 className="text-sm font-bold text-gray-400 mb-2">Debug: Raw Data</h3>
            <pre className="text-xs text-gray-500 overflow-auto max-h-40">
              {JSON.stringify(cardData, null, 2)}
            </pre>
          </div>
        )}

        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Your AI-Powered Sports Card Dashboard is LIVE! 🚀</p>
          <p className="mt-1">
            {cardData ? 'Connected to live data' : 'Waiting for data connection...'}
          </p>
        </div>
      </div>
    </div>
  );
}
