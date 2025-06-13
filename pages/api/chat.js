// pages/api/chat.js
export default async function handler(req, res) {
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
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `You are a sports card investment expert and AI assistant integrated into a sports card portfolio dashboard. You have access to the user's live portfolio data and should provide expert advice on sports card collecting, investing, and market trends.

The user's current portfolio data:
- Portfolio Value: $${cardData?.portfolioValue || 0}
- Cards Tracked: ${cardData?.cardCount || 0}
- Active Alerts: ${cardData?.alerts?.length || 0}
- Investment Opportunities: ${cardData?.investmentOpportunities?.length || 0}

Focus areas:
- Redskins players: Jayden Daniels, Terry McLaurin, Sean Taylor
- Orioles players: Adley Rutschman, Gunnar Henderson, Jackson Holliday, Colton Cowser, Jordan Westburg, Cal Ripken Jr

Provide concise, actionable advice about sports card investing, market trends, player analysis, and portfolio optimization. Be enthusiastic but realistic about card values and investment potential.`
          },
          {
            role: 'user',
            content: message
          }
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'OpenAI API error');
    }

    res.status(200).json({
      message: data.choices[0].message.content
    });

  } catch (error) {
    console.error('Chat API error:', error);
    res.status(500).json({ 
      message: 'Sorry, I\'m having trouble connecting right now. Please try again!' 
    });
  }
}
