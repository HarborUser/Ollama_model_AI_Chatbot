import fs from "fs/promises";
import ollama from "ollama";


function chunkText(text, size = 300, overlap = 50) {
  const chunks = [];
  for (let i = 0; i < text.length; i += size - overlap) {
    chunks.push(text.slice(i, i + size));
  }
  return chunks;
}

function cosineSimilarity(a, b) {
  const dot = a.reduce((sum, v, i) => sum + v * b[i], 0);
  const magA = Math.sqrt(a.reduce((sum, v) => sum + v * v, 0));
  const magB = Math.sqrt(b.reduce((sum, v) => sum + v * v, 0));
  return dot / (magA * magB);
}


export async function askRag(question) {
  const text = await fs.readFile("cat-facts.txt", "utf-8");
  const chunks = chunkText(text);

  const embeddedChunks = [];
  for (const chunk of chunks) {
    const res = await ollama.embeddings({
      model: "nomic-embed-text",
      prompt: chunk,
    });

    embeddedChunks.push({
      text: chunk,
      embedding: res.embedding,
    });
  }


  const queryEmbedding = (
    await ollama.embeddings({
      model: "nomic-embed-text",
      prompt: question,
    })
  ).embedding;

  // Retrieve top chunks
  const topChunks = embeddedChunks
    .map(c => ({
      ...c,
      score: cosineSimilarity(queryEmbedding, c.embedding),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  const context = topChunks.map(c => `- ${c.text}`).join("\n");

  const prompt = `
Use ONLY the context below to answer the question.
Do not add new information.

Context:
${context}

Question:
${question}
`;

  const response = await ollama.generate({
    model: "llama3",
    prompt,
    options: { temperature: 0 },
  });

  return response.response;
}
