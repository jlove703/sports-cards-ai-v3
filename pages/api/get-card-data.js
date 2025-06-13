// pages/api/get-card-data.js (for Next.js)
// or wherever your API routes go

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
  recentCards: [
    {
      name: "Patrick Mahomes Rookie PSA 10",
      description: "2017 Panini Prizm",
      price: "2,450",
      timestamp: "2 hours ago"
    },
    {
      name: "Connor Bedard Young Guns",
      description: "2023-24 Upper Deck",
      price: "890",
      timestamp: "4 hours ago"
    }
  ]
};

export default function handler(req, res) {
  if (req.method === 'GET') {
    // Return the current card data
    res.status(200).json(cardDataStore);
  } else if (req.method === 'POST') {
    // Update card data (this is where N8N will send data)
    try {
      const newData = req.body;
      
      // Merge new data with existing data
      cardDataStore = {
        ...cardDataStore,
        ...newData,
        lastUpdated: new Date().toISOString()
      };
      
      console.log('Card data updated:', cardDataStore);
      res.status(200).json({ success: true, data: cardDataStore });
    } catch (error) {
      console.error('Error updating card data:', error);
      res.status(500).json({ error: 'Failed to update card data' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
