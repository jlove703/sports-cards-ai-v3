export default function handler(req, res) {
  // This will fetch from your stored data
  res.status(200).json({
    portfolioValue: 1315,
    cardCount: 3,
    alerts: [
      { message: "Jayden Daniels Prizm worth $850", player: "Jayden Daniels", price: 850 }
    ],
    topPlayers: [["Jayden Daniels", 1], ["Gunnar Henderson", 1], ["Terry McLaurin", 1]],
    lastUpdated: new Date().toISOString()
  });
}
