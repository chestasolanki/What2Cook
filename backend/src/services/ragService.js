const Groq = require('groq-sdk');
const searchService = require('./searchService');

let groqClient = null;
function getGroqClient() {
  if (!groqClient) {
    const apiKey = process.env.GROQ_API_KEY || 'dummy_groq_key';
    groqClient = new Groq({ apiKey });
  }
  return groqClient;
}

/**
 * Builds grounded RAG System Prompt with retrieved recipe context.
 */
function buildRAGPrompt(userQuery, retrievedResults) {
  if (!retrievedResults || retrievedResults.length === 0) {
    return {
      systemPrompt: `You are PantryChef AI. The user asked a question, but no matching recipes were found in our verified database. Politely inform the user that no recipes matching their constraints were found in the database.`,
      sources: []
    };
  }

  const sources = retrievedResults.map((item, index) => ({
    sourceId: index + 1,
    id: item.recipe.id,
    title: item.recipe.title,
    cuisine: item.recipe.cuisine,
    nutrition: item.recipe.nutrition,
    ingredients: item.recipe.ingredients,
    instructions: item.recipe.instructions
  }));

  const contextText = sources.map(s => {
    return `[SOURCE ${s.sourceId} - "${s.title}" (${s.nutrition?.calories || 0} kcal, ${s.nutrition?.proteinGrams || 0}g protein)]:
Ingredients: ${Array.isArray(s.ingredients) ? s.ingredients.join(', ') : s.ingredients}
Instructions: ${Array.isArray(s.instructions) ? s.instructions.join(' ') : s.instructions}`;
  }).join('\n\n');

  const systemPrompt = `You are PantryChef AI, an expert culinary assistant.
Answer the user's question using ONLY the retrieved recipe sources provided below.

RULES:
1. Ground your response strictly in the provided sources. Do NOT invent or hallucinate recipes outside of these sources.
2. Include explicit bracketed citations like [Source 1] or [Source 2] whenever referencing a recipe.
3. Clearly list the exact ingredients, calories, and cooking steps from the cited source.
4. Be friendly, appetizing, and organized.

--- RETRIEVED RECIPE SOURCES ---
${contextText}
--- END SOURCES ---`;

  return { systemPrompt, sources };
}

/**
 * Streams grounded RAG response from Groq via SSE
 */
async function generateStreamedRAGResponse(userQuery, searchOptions, res) {
  // 1. Run Hybrid Retrieval
  const searchResults = await searchService.hybridSearch(userQuery, searchOptions);

  // 2. Build Augmented Prompt
  const { systemPrompt, sources } = buildRAGPrompt(userQuery, searchResults);

  // 3. Set SSE Headers for real-time streaming (X-Accel-Buffering: no forces proxy to stream immediately)
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no');

  // Send sources metadata event first
  res.write(`data: ${JSON.stringify({ type: 'sources', sources })}\n\n`);

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey || apiKey === 'dummy_groq_key') {
    const fallbackText = "⚠️ GROQ_API_KEY is not set in Render environment variables. Please add GROQ_API_KEY in Render Dashboard to enable live AI responses.";
    res.write(`data: ${JSON.stringify({ type: 'token', text: fallbackText })}\n\n`);
    res.write(`data: ${JSON.stringify({ type: 'done' })}\n\n`);
    return res.end();
  }

  try {
    const groq = getGroqClient();
    // 4. Stream response from Groq
    const stream = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userQuery }
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.2,
      stream: true
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      if (content) {
        res.write(`data: ${JSON.stringify({ type: 'token', text: content })}\n\n`);
      }
    }

    // Send end signal
    res.write(`data: ${JSON.stringify({ type: 'done' })}\n\n`);
    res.end();
  } catch (error) {
    console.error("Groq RAG Streaming Error:", error);
    const errDesc = error.message || 'Failed to stream response';
    res.write(`data: ${JSON.stringify({ type: 'error', message: `Groq Error: ${errDesc}` })}\n\n`);
    res.end();
  }
}

module.exports = {
  generateStreamedRAGResponse
};