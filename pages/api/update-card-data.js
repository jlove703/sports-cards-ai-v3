// pages/api/update-card-data.js
let latestCardData = {
  portfolioValue: 1315,
  cardCount: 3,
  alerts: [
    { message: "Jayden Daniels Prizm worth $850", player: "Jayden Daniels", price: 850 }
  ],
  topPlayers: [["Jayden Daniels", 1], ["Gunnar Henderson", 1], ["Terry McLaurin", 1]],
  lastUpdated: new Date().toISOString()
};

export default function handler(req, res) {
  if (req.method === 'POST') {
    // Store incoming N8N data
    console.log('🔥 CARD DATA RECEIVED:', req.body);
    latestCardData = { ...req.body, lastUpdated: new Date().toISOString() };
    
    res.status(200).json({ 
      message: 'Sports card data received successfully!',
      timestamp: new Date().toISOString(),
      status: 'success'
    });
  } 
  else if (req.method === 'GET') {
    // Return stored data to dashboard
    res.status(200).json(latestCardData);
  } 
  else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
