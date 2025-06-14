let hotPlayersData = { hotPlayers: [], lastUpdated: new Date().toISOString() };

export default function handler(req, res) {
  if (req.method === 'POST') {
    // Store the data from n8n
    hotPlayersData = req.body;
    console.log('Received hot players data:', req.body);
    res.json({ success: true });
  } else if (req.method === 'GET') {
    // Return the stored data to the widget
    res.json(hotPlayersData);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
