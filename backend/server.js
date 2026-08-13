require('dotenv').config();
const app = require('./src/app.js');

const searchService = require('./src/services/searchService');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`PantryChef Backend running on http://localhost:${PORT}`);
  // Eagerly pre-load BM25 index & vector embeddings on server boot
  searchService.initializeSearchEngine().catch(err => {
    console.warn("⚠️ Search engine async init warning:", err.message);
  });
});