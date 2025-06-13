// pages/api/card-data.js

// Simple in-memory storage
let cardDataStore = {
  portfolioValue: 1315,
  alerts: [],
  mlbData: {},
  lastUpdated: new Date().toISOString()
};

export default function handler(req, res) {
  try {
    if (req.method === 'GET') {
      // Return current data
      return res.status(200).json(cardDataStore);
    } 
    
    if (req.method === 'POST') {
      // Update data from N8N
      const newData = req.body;
      
      // Safely merge data
      cardDataStore = {
        ...cardDataStore,
        ...newData,
        lastUpdated: new Date().toISOString()
      };
      
      return res.status(200).json({ 
        message: 'Data updated successfully',
        status: 'success' 
      });
    }
    
    // Method not allowed
    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}
