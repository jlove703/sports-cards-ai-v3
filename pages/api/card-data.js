// API endpoint to receive N8N card data
export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  console.log('Received card data:', req.body);
  
  // Store the data (for now just log it)
  const cardData = req.body;
  
  // You could save to database here
  // For now, just confirm receipt
  
  res.status(200).json({ 
    message: 'Card data received successfully',
    timestamp: new Date().toISOString(),
    dataReceived: true
  });
}
