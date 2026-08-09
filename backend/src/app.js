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

// Mount Routes
app.use('/api/recipes', recipeRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/saved-recipes', savedRecipeRoutes);
app.use('/api/auth', authRoutes);

module.exports = app;