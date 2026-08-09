const ragService = require('../services/ragService');

async function handleChat(req, res) {
  try {
    const { message, maxCalories, minProtein, isVegetarian } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    await ragService.generateStreamedRAGResponse(
      message,
      {
        maxCalories: maxCalories ? parseInt(maxCalories) : null,
        minProtein: minProtein ? parseInt(minProtein) : null,
        isVegetarian: Boolean(isVegetarian),
        topK: 3
      },
      res
    );
  } catch (error) {
    console.error("Chat Controller Error:", error);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Chat processing failed' });
    }
  }
}

module.exports = { handleChat };