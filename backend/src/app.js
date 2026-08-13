const express = require('express');
const cors = require('cors');
const recipeRoutes = require('./routes/recipeRoutes');
const chatRoutes = require('./routes/chatRoutes');
const savedRecipeRoutes = require('./routes/savedRecipeRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(express.json());
app.use(cors());

// Set Cross-Origin Opener Policy for Google OAuth popups
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  next();
});

// Health check endpoints
app.get('/', (req, res) => res.json({ status: 'ok', message: 'PantryChef Backend API Operational' }));
app.get('/api', (req, res) => res.json({ status: 'ok', message: 'PantryChef API Operational' }));

// Mount Routes
app.use('/api/recipes', recipeRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/saved-recipes', savedRecipeRoutes);
app.use('/api/auth', authRoutes);

// Fallback JSON 404 Handler (prevents HTML responses on invalid endpoints)
app.use((req, res) => {
  res.status(404).json({ error: 'API Endpoint Not Found' });
});

module.exports = app;