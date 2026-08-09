/**
 * API Service for PantryChef RAG Backend
 */

const API_BASE = 'http://localhost:3000/api';

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
      throw new Error(`Server returned ${response.status}`);
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
    onError && onError(err.message || 'Network error streaming RAG response');
  }
}

export async function fetchPopularRecipesApi() {
  const res = await fetch(`${API_BASE}/recipes/popular`);
  if (!res.ok) throw new Error('Failed to fetch popular recipes');
  return res.json();
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
  return res.json();
}

/**
 * Saved Recipes API Endpoints
 */
export async function fetchSavedRecipes() {
  const res = await fetch(`${API_BASE}/saved-recipes`);
  if (!res.ok) throw new Error('Failed to fetch saved recipes');
  return res.json();
}

export async function saveRecipeApi(recipe) {
  const res = await fetch(`${API_BASE}/saved-recipes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ recipe })
  });
  if (!res.ok) throw new Error('Failed to save recipe');
  return res.json();
}

export async function deleteSavedRecipeApi(id) {
  const res = await fetch(`${API_BASE}/saved-recipes/${id}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error('Failed to delete saved recipe');
  return res.json();
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
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || 'Google authentication failed');
  }
  return res.json();
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
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || 'Failed to update profile');
  }
  return res.json();
}
