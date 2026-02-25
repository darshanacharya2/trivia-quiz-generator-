/**
 * Generates a trivia quiz via the backend API.
 * @param {string} topic
 * @param {string} difficulty - easy | medium | hard | mixed
 * @param {number} count - 5 | 10 | 15
 */
export async function generateQuiz(topic, difficulty, count) {
  const response = await fetch("/api/quiz/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ topic, difficulty, count }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to generate quiz.");
  }

  return data;
}
