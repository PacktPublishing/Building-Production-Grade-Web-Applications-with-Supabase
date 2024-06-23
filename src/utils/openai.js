const API_KEY = process.env.OPENAI_KEY;
const EMBEDDING_API_URL = "https://api.openai.com/v1/embeddings";
const EMBEDDING_MODEL = "text-embedding-3-small";

export async function getOpenAIEmbedding(input) {
  const { data } = await fetch(EMBEDDING_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: EMBEDDING_MODEL,
      input,
    }),
  }).then((res) => res.json());

  return data[0].embedding;
}
