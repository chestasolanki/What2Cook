const userService = require('../services/userService');

// POST /api/auth/google
async function googleLogin(req, res) {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({ error: 'Google credential token is required' });
    }

    const result = await userService.loginWithGoogle(credential);
    res.json(result);
  } catch (err) {
    console.error('Google Auth Error:', err);
    res.status(401).json({ error: err.message || 'Google authentication failed' });
  }
}

// GET /api/auth/me
function getProfile(req, res) {
  const user = userService.findUserById(req.user.userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json({ user });
}

// PUT /api/auth/profile
function updateProfile(req, res) {
  try {
    const { name } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const result = userService.updateUserProfile({
      userId: req.user.userId,
      name
    });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to update profile' });
  }
}

module.exports = {
  googleLogin,
  getProfile,
  updateProfile
};
