/**
 * API Service for What2Cook Backend
 */

let envUrl = (import.meta.env.VITE_API_BASE_URL || '').trim();
if (!envUrl) {
  envUrl = import.meta.env.MODE === 'production'
    ? 'https://what2cook-5z9z.onrender.com/api'
    : 'http://localhost:3000/api';
}
// Sanitize URL: remove trailing slashes and ensure /api path suffix
envUrl = envUrl.replace(/\/+$/, '');
if (!envUrl.endsWith('/api') && !envUrl.includes('/api/')) {
  envUrl = `${envUrl}/api`;
}

const API_BASE = envUrl;

/**
 * Safe JSON response parser that catches HTML 404 responses
 */
async function parseJsonResponse(res) {
  const contentType = res.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return res.json();
  }
  const text = await res.text();
  if (text.trim().startsWith('<')) {
    throw new Error('Received HTML response instead of API JSON. Please check backend VITE_API_BASE_URL URL setting.');
  }
  try {
    return JSON.parse(text);
  } catch {
    throw new Error(`API Error ${res.status}: ${text || 'Unknown response'}`);
  }
}

/**
 * Streams chat response from /api/chat via Server-Sent Events (SSE)
 */
export async function streamRAGChat({ message, maxCalories, minProtein, isVegetarian, onSources, onToken, onError, onDone }) {
  try {
    const response = await fetch(`${API_BASE}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message,
        maxCalories: maxCalories ? parseInt(maxCalories) : null,
        minProtein: minProtein ? parseInt(minProtein) : null,
        isVegetarian: Boolean(isVegetarian)
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(errText.startsWith('<') ? 'Backend server unavailable' : errText);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n\n');
      buffer = lines.pop(); // Keep last incomplete line in buffer

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const jsonStr = line.replace(/^data:\s*/, '').trim();
          if (!jsonStr) continue;

          try {
            const data = JSON.parse(jsonStr);

            if (data.type === 'sources') {
              onSources && onSources(data.sources);
            } else if (data.type === 'token') {
              onToken && onToken(data.text);
            } else if (data.type === 'error') {
              onError && onError(data.message);
            } else if (data.type === 'done') {
              onDone && onDone();
            }
          } catch (err) {
            console.warn('Failed to parse SSE JSON line:', line, err);
          }
        }
      }
    }
  } catch (err) {
    onError && onError(err.message || 'Network error streaming response');
  }
}

export async function fetchPopularRecipesApi() {
  try {
    const res = await fetch(`${API_BASE}/recipes/popular`);
    if (!res.ok) throw new Error('Failed to fetch popular recipes');
    return await parseJsonResponse(res);
  } catch (err) {
    console.warn('Popular recipes API notice:', err.message);
    return { recipes: [] };
  }
}

/**
 * Searches recipes directly via /api/recipes/search
 */
export async function searchRecipes({ query, maxCalories, minProtein }) {
  const params = new URLSearchParams({ q: query });
  if (maxCalories) params.append('maxCalories', maxCalories);
  if (minProtein) params.append('minProtein', minProtein);

  const res = await fetch(`${API_BASE}/recipes/search?${params.toString()}`);
  if (!res.ok) throw new Error('Failed to search recipes');
  return parseJsonResponse(res);
}

/**
 * Saved Recipes API Endpoints
 */
export async function fetchSavedRecipes() {
  try {
    const res = await fetch(`${API_BASE}/saved-recipes`);
    if (!res.ok) throw new Error('Failed to fetch saved recipes');
    return await parseJsonResponse(res);
  } catch (err) {
    console.warn('Saved recipes API notice:', err.message);
    return { recipes: [] };
  }
}

export async function saveRecipeApi(recipe) {
  const res = await fetch(`${API_BASE}/saved-recipes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ recipe })
  });
  if (!res.ok) throw new Error('Failed to save recipe');
  return parseJsonResponse(res);
}

export async function deleteSavedRecipeApi(id) {
  const res = await fetch(`${API_BASE}/saved-recipes/${id}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error('Failed to delete saved recipe');
  return parseJsonResponse(res);
}

/**
 * Google Authentication API
 */
export async function loginWithGoogleApi(credential) {
  const res = await fetch(`${API_BASE}/auth/google`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ credential })
  });
  return parseJsonResponse(res);
}

export async function updateProfileApi({ name, token }) {
  const res = await fetch(`${API_BASE}/auth/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ name })
  });
  return parseJsonResponse(res);
}
