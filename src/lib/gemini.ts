import type { IndiaDataRow } from '@/types'

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || ''
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:streamGenerateContent?key=${GEMINI_API_KEY}&alt=sse`

export function buildDataContext(data: IndiaDataRow[]): string {
  const sample = data.slice(0, 200)
  const states = [...new Set(sample.map((r) => r.state))]
  const years = [...new Set(sample.map((r) => r.year))].sort()
  const avgLiteracy = (sample.reduce((a, b) => a + b.literacyRate, 0) / sample.length).toFixed(1)
  const avgHealth = (sample.reduce((a, b) => a + b.healthIndex, 0) / sample.length).toFixed(1)
  const avgGDP = (sample.reduce((a, b) => a + b.gdpContribution, 0) / sample.length).toFixed(2)
  const avgAgri = (sample.reduce((a, b) => a + b.agriculturalOutput, 0) / sample.length).toFixed(1)

  const topLiteracy = [...sample].sort((a, b) => b.literacyRate - a.literacyRate).slice(0, 5)
  const topHealth = [...sample].sort((a, b) => b.healthIndex - a.healthIndex).slice(0, 5)

  return `
DATASET SUMMARY (${data.length} rows filtered):
States: ${states.slice(0, 10).join(', ')}${states.length > 10 ? ` +${states.length - 10} more` : ''}
Years: ${years.join(', ')}
Averages: Literacy ${avgLiteracy}%, Health Index ${avgHealth}, GDP Contribution ${avgGDP}%, Agricultural Output ${avgAgri}%

Top 5 States by Literacy:
${topLiteracy.map((r) => `  - ${r.state} (${r.year}): ${r.literacyRate}%`).join('\n')}

Top 5 States by Health Index:
${topHealth.map((r) => `  - ${r.state} (${r.year}): ${r.healthIndex}`).join('\n')}
`
}

export async function streamGeminiInsight(
  query: string,
  dataContext: string,
  onChunk: (text: string) => void,
  onDone: () => void,
  onError: (err: string) => void
) {
  const systemPrompt = `You are a senior data analyst for Indian government datasets on the Bharat Insight platform.
You specialize in analyzing public sector data including education, health, agriculture, and economic metrics.
Your analysis is concise, data-driven, and actionable.
Always structure responses with: 🔍 Key Insight | 📈 Trend | 💡 Recommendation`

  const fullPrompt = `${systemPrompt}

${dataContext}

User Query: ${query}

Provide analysis with specific numbers from the dataset. Be concise (3-4 sentences per section).`

  if (!GEMINI_API_KEY || GEMINI_API_KEY === '') {
    // Demo mode - simulate streaming
    const demoResponse = generateDemoResponse(query, dataContext)
    let i = 0
    const interval = setInterval(() => {
      if (i < demoResponse.length) {
        onChunk(demoResponse.slice(0, i + 3))
        i += 3
      } else {
        clearInterval(interval)
        onDone()
      }
    }, 30)
    return
  }

  try {
    const res = await fetch(GEMINI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: fullPrompt }] }],
        generationConfig: { temperature: 0.7, maxOutputTokens: 1024 },
      }),
    })

    if (!res.ok) {
      throw new Error(`Gemini API error: ${res.status}`)
    }

    const reader = res.body?.getReader()
    const decoder = new TextDecoder()
    let accumulated = ''

    if (!reader) {
      onError('No response stream available')
      return
    }

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      const chunk = decoder.decode(value, { stream: true })
      const lines = chunk.split('\n').filter((l) => l.startsWith('data: '))

      for (const line of lines) {
        try {
          const json = JSON.parse(line.slice(6))
          const text = json?.candidates?.[0]?.content?.parts?.[0]?.text || ''
          accumulated += text
          onChunk(accumulated)
        } catch {
          // skip malformed chunks
        }
      }
    }

    onDone()
  } catch (err) {
    onError(err instanceof Error ? err.message : 'Unknown error')
  }
}

function generateDemoResponse(query: string, context: string): string {
  const q = query.toLowerCase()

  if (q.includes('literacy')) {
    return `🔍 **Key Insight**\nKerala leads with 94% literacy rate, significantly above the national average of 74.2%. States like Bihar (61.8%) and Arunachal Pradesh (65.4%) show the largest gaps needing intervention.

📈 **Trend**\nLiteracy rates show consistent upward movement of ~2% annually across all states from 2015-2024. Southern states are converging toward 90%+ while northern states lag by 15-20 percentage points.

💡 **Recommendation**\nFocus the National Literacy Mission resources on Bihar, Rajasthan, and Uttar Pradesh where population density is highest and literacy gaps are widest. A targeted 5-year program could add 40 million literate citizens.`
  }

  if (q.includes('agriculture') || q.includes('agri')) {
    return `🔍 **Key Insight**\nBihar and Uttar Pradesh show the highest agricultural output percentages (22.1% and 18.4% of state GDP respectively), indicating agrarian economies that remain highly dependent on farming.

📈 **Trend**\nAgricultural contribution to GDP is declining by ~0.5% annually in industrializing states like Maharashtra and Gujarat, while remaining stable or growing in eastern states. This reflects structural economic transformation.

💡 **Recommendation**\nInvest in precision agriculture technologies and cold-chain infrastructure in high-output states. Diversification programs in Bihar and Odisha could raise farmer incomes by 30-40% without reducing overall output.`
  }

  return `🔍 **Key Insight**\nAnalysis of ${context.includes('rows') ? 'the filtered dataset' : 'available data'} reveals significant inter-state disparities across health, education and economic indicators. The top 5 performing states outperform the bottom 5 by a factor of 2-3x across most metrics.

📈 **Trend**\nAll key development indicators show positive trajectories from 2015-2024, with health index improving by ~4 points and literacy rates rising ~2% annually on average. Southern and western states are pulling ahead of the national average more rapidly.

💡 **Recommendation**\nImplement a convergence-focused development strategy that channels additional central funds to lagging states while maintaining momentum in high-performers. Data suggests that states crossing the 75% literacy threshold see accelerated improvements in health outcomes within 3-5 years.`
}
