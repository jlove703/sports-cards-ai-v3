export default function handler(req, res) {
  if (req.method === 'GET') {
    // Return the stored data
    res.status(200).json(cardDataStore);
  } else if (req.method === 'POST') {
    try {
      const newData = req.body;
      
      // DEBUG: Log everything N8N sends
      console.log('=== FULL N8N DATA ===');
      console.log(JSON.stringify(newData, null, 2));
      console.log('=== END N8N DATA ===');
      
      // Store the data
      cardDataStore = {
        ...cardDataStore,
        ...newData,
        lastUpdated: new Date().toISOString()
      };
      
      res.status(200).json({ 
        message: 'Data received',
        status: 'success'
      });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: error.message });
    }
  }
}
