'use client'

import React, { useState, useEffect, useRef } from 'react';
import { DollarSign, Target, Star, AlertCircle, TrendingUp, RefreshCw, MessageCircle, X, Send, Loader2 } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export default function Home() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [cardData, setCardData] = useState({
    portfolioValue: 1315,
    cardCount: 3,
    alerts: [],
    topPlayers: [],
    investmentOpportunities: [],
    portfolioAnalysis: {
      highValueCards: 0,
      rookieCardValue: 0,
      legendCardValue: 0
    },
    summary: {
      avgCardValue: 0,
      totalAlerts: 0,
      highPriorityAlerts: 0,
      investmentOps: 0
    },
    lastUpdated: null
  });
  const [loading, setLoading] = useState(false);

  // Chat Widget State
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi! I'm your sports card AI assistant. I can help analyze your portfolio, suggest investments, and answer questions about cards and players. What would you like to know?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Fetch live card data
  const fetchCardData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/get-card-data');
      const data = await response.json();
      setCardData(data);
    } catch (error) {
      console.error('Error fetching card data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Chat functionality
  const sendMessage = async () => {
    if (!inputMessage.trim() || isChatLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsChatLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage,
          cardData: cardData
        }),
      });

      const data = await response.json();

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.message,
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I'm having trouble connecting right now. Please try again!",
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const quickPrompts = [
    "Analyze my portfolio",
    "Should I buy Jayden Daniels cards?",
    "What's hot in the market?",
    "Evaluate my Orioles collection"
  ];

  const handleQuickPrompt = (prompt: string) => {
    setInputMessage(prompt);
  };

  // Fetch data on component mount and every 2 minutes
  useEffect(() => {
    fetchCardData();
    const interval = setInterval(fetchCardData, 120000); // 2 minutes
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Sports Card Agent Dashboard
              </h1>
              <p className="text-gray-300 mt-2">
                AI-Powered Investment Intelligence • {currentTime.toLocaleString()}
              </p>
            </div>
            <button 
              onClick={fetchCardData}
              disabled={loading}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh Data</span>
            </button>
          </div>
        </div>

        {/* Data Status */}
        <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-xl p-6 mb-6 border border-green-500/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <h2 className="text-xl font-semibold">N8N Sports Card Agent</h2>
              <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">
                Live Data
              </span>
            </div>
            <div className="text-right">
              <p className="text-gray-300">Last updated: {cardData.lastUpdated ? new Date(cardData.lastUpdated).toLocaleTimeString() : 'Never'}</p>
              <p className="text-sm text-gray-400">Redskins & Orioles PC Tracker</p>
            </div>
          </div>
        </div>

        {/* Main Stats Grid - NOW WITH LIVE DATA */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Portfolio Value</p>
                <p className="text-2xl font-bold text-green-400">${cardData.portfolioValue?.toLocaleString() || '0'}</p>
                <p className="text-sm text-green-300">Live from N8N</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-400" />
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Cards Tracked</p>
                <p className="text-2xl font-bold text-blue-400">{cardData.cardCount || 0}</p>
                <p className="text-sm text-blue-300">Active monitoring</p>
              </div>
              <Target className="w-8 h-8 text-blue-400" />
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Investment Ops</p>
                <p className="text-2xl font-bold text-purple-400">{cardData.summary?.investmentOps || 0}</p>
                <p className="text-sm text-purple-300">Opportunities found</p>
              </div>
              <Star className="w-8 h-8 text-purple-400" />
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Active Alerts</p>
                <p className="text-2xl font-bold text-orange-400">{cardData.alerts?.length || 0}</p>
                <p className="text-sm text-orange-300">Live notifications</p>
              </div>
              <AlertCircle className="w-8 h-8 text-orange-400" />
            </div>
          </div>
        </div>

        {/* Investment Intelligence Section */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
          {/* Investment Opportunities */}
          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl p-6 border border-green-500/30">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              💎 Investment Opportunities
            </h3>
            <div className="space-y-3">
              {cardData.investmentOpportunities && cardData.investmentOpportunities.length > 0 ? (
                cardData.investmentOpportunities.map((opp, index) => (
                  <div key={index} className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-sm text-green-300">{opp.player}</p>
                        <p className="text-xs text-gray-400">{opp.card}</p>
                        <p className="text-xs text-green-400 mt-1">{opp.reasoning}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-green-300">${opp.currentPrice}</p>
                        <p className="text-xs text-green-400">+{opp.upside}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 bg-gray-700/30 rounded-lg">
                  <p className="text-gray-400">No opportunities detected</p>
                </div>
              )}
            </div>
          </div>

          {/* Portfolio Analysis */}
          <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl p-6 border border-blue-500/30">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              📊 Portfolio Analysis
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-400">Avg Card Value</span>
                <span className="text-blue-300">${cardData.summary?.avgCardValue || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">High Value Cards</span>
                <span className="text-purple-300">{cardData.portfolioAnalysis?.highValueCards || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Rookie Value</span>
                <span className="text-green-300">${cardData.portfolioAnalysis?.rookieCardValue?.toLocaleString() || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Legend Value</span>
                <span className="text-yellow-300">${cardData.portfolioAnalysis?.legendCardValue?.toLocaleString() || 0}</span>
              </div>
            </div>
          </div>

          {/* Alert Summary */}
          <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-xl p-6 border border-orange-500/30">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              🚨 Alert Summary
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-400">Total Alerts</span>
                <span className="text-orange-300">{cardData.summary?.totalAlerts || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">High Priority</span>
                <span className="text-red-300">{cardData.summary?.highPriorityAlerts || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Investment Ops</span>
                <span className="text-green-300">{cardData.summary?.investmentOps || 0}</span>
              </div>
              <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg mt-4">
                <p className="text-xs text-orange-300">
                  🔥 Your PC is being actively monitored for opportunities!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Live Data Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Live Alerts from N8N */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <AlertCircle className="w-5 h-5 mr-2 text-yellow-400" />
              Live N8N Alerts
            </h3>
            <div className="space-y-4">
              {cardData.alerts && cardData.alerts.length > 0 ? (
                cardData.alerts.slice(0, 5).map((alert, index) => (
                  <div key={index} className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-sm text-yellow-300">{alert.message}</p>
                        <p className="text-xs text-gray-400 mt-1">Player: {alert.player}</p>
                        <p className="text-xs text-gray-400">Priority: {alert.priority}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        alert.priority === 'HIGH' ? 'bg-red-500/20 text-red-300' :
                        alert.priority === 'MEDIUM' ? 'bg-orange-500/20 text-orange-300' :
                        'bg-green-500/20 text-green-300'
                      }`}>
                        {alert.action}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 bg-gray-700/30 rounded-lg">
                  <p className="text-gray-400">No active alerts</p>
                </div>
              )}
            </div>
          </div>

          {/* Top Players from N8N */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
              Your PC Players
            </h3>
            <div className="space-y-4">
              {cardData.topPlayers && cardData.topPlayers.length > 0 ? (
                cardData.topPlayers.map(([player, count], index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{player}</p>
                      <p className="text-xs text-gray-400">
                        {player === 'Jayden Daniels' || player === 'Terry McLaurin' ? '🏈 Redskins' :
                         player === 'Sean Taylor' ? '🏈 Redskins Legend' :
                         player === 'Cal Ripken Jr' ? '⚾ Orioles Legend' :
                         '⚾ Orioles'}
                      </p>
                    </div>
                    <div className="flex items-center text-green-400">
                      <span className="font-semibold">{count} cards</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 bg-gray-700/30 rounded-lg">
                  <p className="text-gray-400">No player data available</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Powered by N8N Workflows • Redskins & Orioles PC Intelligence • Live updates every 2 minutes</p>
        </div>
      </div>

      {/* Chat Widget - Built In */}
      <>
        {/* Chat Bubble */}
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50 animate-pulse"
          >
            <MessageCircle className="w-6 h-6" />
          </button>
        )}

        {/* Chat Window */}
        {isOpen && (
          <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-xl shadow-2xl z-50 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <h3 className="font-semibold text-white">Sports Card AI</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-700 text-gray-100'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-blue-100' : 'text-gray-400'
                    }`}>
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
              
              {isChatLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-700 text-gray-100 p-3 rounded-lg flex items-center space-x-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">Thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts */}
            {messages.length <= 1 && (
              <div className="p-3 border-t border-gray-700">
                <p className="text-xs text-gray-400 mb-2">Quick questions:</p>
                <div className="flex flex-wrap gap-1">
                  {quickPrompts.map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickPrompt(prompt)}
                      className="text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 px-2 py-1 rounded transition-colors"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-gray-700">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Ask about your cards..."
                  className="flex-1 bg-gray-800 text-white border border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                  disabled={isChatLoading}
                />
                <button
                  onClick={sendMessage}
                  disabled={!inputMessage.trim() || isChatLoading}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white p-2 rounded-lg transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  );
}
