// pages/api/card-data.js

let cardDataStore = {
  portfolioValue: 16750,
  monthlyGain: 1450,
  hotCardsCount: 7,
  newCardsToday: 3,
  avgROI: 34,
  roiTrend: '+5',
  activeAlerts: 2,
  urgentAlerts: 1,
  lastUpdated: new Date().toISOString(),
  mlbAlerts: [],
  recentCards: [],
  topPerformers: []
};

export default function handler(req, res) {
  if (req.method === 'GET') {
    // Return the current card data for dashboard
    res.status(200).json(cardDataStore);
  } else if (req.method === 'POST') {
    // Update card data when N8N sends new data
    try {
      const newData = req.body;
      
      console.log('Received data from N8N:', newData);
      
      // Merge new data with existing data
      cardDataStore = {
        ...cardDataStore,
        ...newData,
        lastUpdated: new Date().toISOString()
      };
      
      console.log('Updated card data store:', cardDataStore);
      
      res.status(200).json({ 
        message: 'Sports card data received successfully!',
        timestamp: new Date().toISOString(),
        status: 'success'
      });
    } catch (error) {
      console.error('Error updating card data:', error);
      res.status(500).json({ 
        message: 'Failed to update card data',
        error: error.message,
        status: 'error'
      });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
