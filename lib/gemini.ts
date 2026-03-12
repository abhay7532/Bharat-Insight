const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY ?? "";
const GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:streamGenerateContent";

export interface GeminiChunk {
  text: string;
  done: boolean;
}

export async function* streamGeminiResponse(
  prompt: string,
  onChunk: (chunk: string) => void
): AsyncGenerator<string> {
  if (!GEMINI_API_KEY || GEMINI_API_KEY === "") {
    // Simulate streaming for demo
    const demo = `**Key Insight:** Based on the filtered dataset, Maharashtra and Karnataka show consistently high GDP contribution rates averaging 12.4% and 10.2% respectively over the analyzed period.\n\n**Trend:** Literacy rates across northern states show an upward trajectory of approximately 2.3% annually since 2015, with Bihar and Uttar Pradesh leading improvement rates.\n\n**Recommendation:** Prioritize healthcare infrastructure investment in states with Health Index below 65 — particularly Jharkhand, Odisha, and Bihar — where correlation analysis suggests a 1-point health index improvement yields 0.8% GDP growth.`;
    const words = demo.split(" ");
    for (const word of words) {
      await new Promise((r) => setTimeout(r, 40));
      onChunk(word + " ");
      yield word + " ";
    }
    return;
  }

  const body = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: { temperature: 0.7, maxOutputTokens: 1024 },
  };

  const res = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}&alt=sse`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const reader = res.body?.getReader();
  if (!reader) return;

  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";
    for (const line of lines) {
      if (line.startsWith("data: ")) {
        try {
          const json = JSON.parse(line.slice(6));
          const text = json?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
          if (text) {
            onChunk(text);
            yield text;
          }
        } catch {}
      }
    }
  }
}

export function buildPrompt(dataContext: string, query: string): string {
  return `You are a senior data analyst specializing in Indian government datasets.

Dataset Context:
${dataContext}

User Query: ${query}

Provide a concise analysis with:
1. **Key Insight**: Most significant finding from the data
2. **Trend**: Observable pattern or trajectory
3. **Recommendation**: Actionable policy recommendation

Use markdown formatting. Be specific with numbers from the dataset. Keep response under 300 words.`;
}
