import { useCallback } from 'react'
import { useAppStore } from '@/store/appStore'
import { streamGeminiInsight, buildDataContext } from '@/lib/gemini'
import { generateId } from '@/lib/utils'
import type { IndiaDataRow } from '@/types'

export function useAI() {
  const {
    addAIMessage,
    updateLastAIMessage,
    setIsAIThinking,
    setAIThinkingStep,
    clearAIMessages,
    isAIThinking,
  } = useAppStore()

  const sendMessage = useCallback(
    async (query: string, filteredData: IndiaDataRow[]) => {
      if (isAIThinking) return

      // Add user message
      addAIMessage({
        id: generateId(),
        role: 'user',
        content: query,
        timestamp: new Date(),
      })

      setIsAIThinking(true)
      setAIThinkingStep('Analyzing dataset context...')

      const dataContext = buildDataContext(filteredData)

      // Add placeholder assistant message
      const assistantId = generateId()
      addAIMessage({
        id: assistantId,
        role: 'assistant',
        content: '',
        timestamp: new Date(),
        isStreaming: true,
      })

      setTimeout(() => setAIThinkingStep('Generating insights...'), 800)
      setTimeout(() => setAIThinkingStep('Formulating recommendations...'), 1600)

      await streamGeminiInsight(
        query,
        dataContext,
        (text) => {
          updateLastAIMessage(text)
        },
        () => {
          setIsAIThinking(false)
          setAIThinkingStep('')
          // Mark last message as done streaming
          useAppStore.setState((state) => {
            const msgs = [...state.aiMessages]
            if (msgs.length > 0) {
              msgs[msgs.length - 1] = { ...msgs[msgs.length - 1], isStreaming: false }
            }
            return { aiMessages: msgs }
          })
        },
        (err) => {
          setIsAIThinking(false)
          setAIThinkingStep('')
          updateLastAIMessage(`⚠️ Error: ${err}. Please check your Gemini API key.`)
        }
      )
    },
    [isAIThinking, addAIMessage, updateLastAIMessage, setIsAIThinking, setAIThinkingStep]
  )

  return { sendMessage, clearAIMessages, isAIThinking }
}
