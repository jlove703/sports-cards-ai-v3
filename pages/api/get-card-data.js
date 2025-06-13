// pages/api/get-card-data.js

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
  
  // MLB Performance Alerts
  mlbAlerts: [
    {
      player: "Vladimir Guerrero Jr.",
      performance: "3 HRs in last 2 games (.450 BA this week)",
      impact: "Rookie cards +25%",
      timestamp: "2 hours ago"
    },
    {
      player: "Ronald Acuna Jr.",
      performance: "30-30 season milestone reached",
      impact: "All cards trending up",
      timestamp: "5 hours ago"
    }
  ],
  
  // Cards impacted by MLB performance
  recentCards: [
    {
      name: "Vladimir Guerrero Jr. 2019 Topps Chrome Rookie",
      description: "PSA 10",
      mlbTrigger: "Hot streak: 3 HRs in 2 games",
      price: "850",
      priceChange: "+32%",
      timestamp: "2 hours ago"
    },
    {
      name: "Ronald Acuna Jr. 2018 Topps Update Rookie",
      description: "PSA 9",
      mlbTrigger: "30-30 season achieved",
      price: "1,200",
      priceChange: "+18%",
      timestamp: "5 hours ago"
    }
  ],
  
  // Top MLB performers to watch
  topPerformers: [
    {
      name: "Gunnar Henderson",
      position: "SS",
      stats: ".285 BA, 25 HRs, 75 RBIs",
      cardOpportunity: "Rookie cards undervalued"
    },
    {
      name: "Corbin Carroll",
      position: "OF",
      stats: "ROY leader, 20-20 season",
      cardOpportunity: "All cards trending up"
    },
    {
      name: "Gleyber Torres",
      position: "2B",
      stats: "Career month: .340 BA",
      cardOpportunity: "Short-term spike potential"
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
