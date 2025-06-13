// pages/api/chat.js
export default async function handler(req, res) {
  console.log('API called with:', req.method);
  
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { message, cardData } = req.body;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are a sports card investment expert. Portfolio: $${cardData?.portfolioValue || 0}, ${cardData?.cardCount || 0} cards tracked.`
          },
          {
            role: 'user',
            content: message
          }
        ],
        max_tokens: 300,
      }),
    });

    const data = await response.json();
    console.log('OpenAI response:', data);

    if (!response.ok) {
      throw new Error(data.error?.message || 'OpenAI API error');
    }

    res.status(200).json({
      message: data.choices[0].message.content
    });

  } catch (error) {
    console.error('Chat API error:', error);
    res.status(500).json({ 
      message: 'API Error: ' + error.message
    });
  }
}
