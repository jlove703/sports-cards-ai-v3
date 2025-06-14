import { useState, useEffect } from 'react';

const HotPlayersWidget = () => {
  const [hotPlayers, setHotPlayers] = useState([]);
  const [lastUpdated, setLastUpdated] = useState('');
  const [loading, setLoading] = useState(true);

  const loadHotPlayers = async () => {
    try {
      const response = await fetch('/api/hot-players');
      const data = await response.json();
      setHotPlayers(data.hotPlayers || []);
      setLastUpdated(data.lastUpdated);
      setLoading(false);
    } catch (error) {
      console.error('Error loading hot players:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHotPlayers();
    const interval = setInterval(loadHotPlayers, 30000); // 30 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hot-players-widget bg-gradient-to-br from-blue-900 to-blue-700 rounded-xl p-5 text-white shadow-2xl min-w-[300px] max-w-[400px]">
      <div className="flex items-center justify-between mb-5 border-b border-white/20 pb-3">
        <div className="flex items-center gap-2 text-lg font-bold">
          <span className="animate-pulse">🔥</span>
          Hot Players
        </div>
        <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
          LIVE
        </div>
      </div>
      
      <div className="min-h-[200px]">
        {loading ? (
          <div className="text-center py-5 opacity-70">
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-2"></div>
            Loading hot players...
          </div>
        ) : hotPlayers.length === 0 ? (
          <div className="text-center py-5 opacity-70">No data available</div>
        ) : (
          <ul className="space-y-3">
            {hotPlayers.slice(0, 5).map((player, index) => (
              <li key={index} className="flex items-center justify-between py-3 border-b border-white/10 last:border-b-0">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-yellow-600 text-blue-900 rounded-full flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-bold text-sm">{player.name}</div>
                    <div className="text-xs opacity-80">{player.team}</div>
                  </div>
                </div>
                <div className="text-right text-xs">
                  <div className="text-yellow-400 font-bold text-sm">
                    {Math.round(player.hotness_score || 0)}
                  </div>
                  <div className="opacity-80">
                    {player.avg || 'N/A'} AVG | {player.homeRuns || 0} HR
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      {lastUpdated && (
        <div className="text-center text-xs opacity-70 mt-4 pt-3 border-t border-white/10">
          Updated: {new Date(lastUpdated).toLocaleTimeString()}
        </div>
      )}
    </div>
  );
};

export default HotPlayersWidget;
