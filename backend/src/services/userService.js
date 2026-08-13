const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

const userDataPath = path.join(__dirname, '../../data/users.json');
const JWT_SECRET = process.env.JWT_SECRET || 'pantrychef_super_secret_jwt_key_2026';
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';

const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID);

function ensureUsersFile() {
  if (!fs.existsSync(userDataPath)) {
    const dir = path.dirname(userDataPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(userDataPath, JSON.stringify([], null, 2));
  }
}

function getAllUsers() {
  ensureUsersFile();
  const rawData = fs.readFileSync(userDataPath, 'utf-8');
  return JSON.parse(rawData);
}

function findUserByEmail(email) {
  const users = getAllUsers();
  return users.find(u => u.email.toLowerCase() === email.toLowerCase());
}

function findUserById(id) {
  const users = getAllUsers();
  return users.find(u => u.id === id);
}

/**
 * Verifies Google ID Token or decodes token payload
 */
async function verifyGoogleToken(credential) {
  if (GOOGLE_CLIENT_ID) {
    try {
      const ticket = await googleClient.verifyIdToken({
        idToken: credential,
        audience: GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      return {
        googleId: payload.sub,
        email: payload.email,
        name: payload.name,
        picture: payload.picture
      };
    } catch (err) {
      console.warn('Google verification via client ID failed, using payload decode:', err.message);
    }
  }

  // Fallback JWT payload decoder for development / demo mode
  try {
    const base64Url = credential.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = Buffer.from(base64, 'base64').toString('utf-8');
    const payload = JSON.parse(jsonPayload);
    return {
      googleId: payload.sub || `google_${Date.now()}`,
      email: payload.email || 'user@example.com',
      name: payload.name || payload.email?.split('@')[0] || 'Google User',
      picture: payload.picture || 'https://lh3.googleusercontent.com/a/default-user'
    };
  } catch (err) {
    throw new Error('Invalid Google credential token');
  }
}

/**
 * Finds or creates a user account from Google login
 */
async function loginWithGoogle(credential) {
  const googleProfile = await verifyGoogleToken(credential);
  ensureUsersFile();
  const users = getAllUsers();

  let user = findUserByEmail(googleProfile.email);

  if (!user) {
    user = {
      id: `user_${Date.now()}`,
      googleId: googleProfile.googleId,
      name: googleProfile.name,
      email: googleProfile.email.toLowerCase(),
      picture: googleProfile.picture,
      createdAt: new Date().toISOString()
    };
    users.push(user);
    fs.writeFileSync(userDataPath, JSON.stringify(users, null, 2));
  } else {
    // Update picture or name if updated
    user.picture = googleProfile.picture || user.picture;
    user.name = googleProfile.name || user.name;
    fs.writeFileSync(userDataPath, JSON.stringify(users, null, 2));
  }

  const token = generateToken(user);
  return { user, token };
}

function generateToken(user) {
  return jwt.sign(
    { userId: user.id, email: user.email, name: user.name, picture: user.picture },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
}

function updateUserProfile({ userId, name }) {
  ensureUsersFile();
  const users = getAllUsers();
  const user = users.find(u => u.id === userId);

  if (!user) {
    throw new Error('User not found');
  }

  user.name = name.trim();
  fs.writeFileSync(userDataPath, JSON.stringify(users, null, 2));

  const token = generateToken(user);
  return { user, token };
}

module.exports = {
  findUserByEmail,
  findUserById,
  loginWithGoogle,
  updateUserProfile,
  verifyToken
};
