'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '@/store/appStore'
import { useAI } from '@/hooks/useAI'
import { useDataset } from '@/hooks/useDataset'

const SUGGESTED_QUERIES = [
  'Which state shows highest literacy growth?',
  'Compare agriculture output between states',
  'Give health index trend analysis',
  'Which states need urgent intervention?',
]

function ThinkingIndicator({ step }: { step: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-start gap-3 py-3"
    >
      <div className="w-7 h-7 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center shrink-0">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-3 h-3 border-2 border-indigo-400 border-t-transparent rounded-full"
        />
      </div>
      <div>
        <div className="text-xs text-indigo-300 font-semibold">Thinking...</div>
        <div className="text-xs text-white/30 mt-0.5">{step}</div>
      </div>
    </motion.div>
  )
}

function MessageBubble({ message }: { message: { role: string; content: string; isStreaming?: boolean } }) {
  if (message.role === 'user') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-end"
      >
        <div className="max-w-[85%] glass-strong rounded-2xl rounded-tr-sm px-4 py-3 text-sm text-white">
          {message.content}
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-start gap-3"
    >
      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs shrink-0">
        🤖
      </div>
      <div
        className={`flex-1 text-sm text-white/80 leading-relaxed ai-content ${
          message.isStreaming ? 'typing-cursor' : ''
        }`}
        dangerouslySetInnerHTML={{
          __html: message.content
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br/>'),
        }}
      />
    </motion.div>
  )
}

export function AIInsightPanel() {
  const [query, setQuery] = useState('')
  const { aiMessages, isAIThinking, aiThinkingStep, clearAIMessages } = useAppStore()
  const { sendMessage } = useAI()
  const { filteredData } = useDataset()
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [aiMessages, isAIThinking])

  const handleSend = () => {
    if (!query.trim() || isAIThinking) return
    sendMessage(query.trim(), filteredData)
    setQuery('')
  }

  const handleSuggestion = (q: string) => {
    setQuery(q)
    sendMessage(q, filteredData)
    setQuery('')
  }

  return (
    <div className="flex flex-col h-full bg-surface-100">
      {/* Header */}
      <div className="px-4 py-4 border-b border-white/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-base">🤖</span>
            <div>
              <div className="text-sm font-semibold font-display text-white">AI Insight</div>
              <div className="text-xs text-white/30">Powered by Gemini</div>
            </div>
          </div>
          <button
            onClick={clearAIMessages}
            className="text-xs text-white/20 hover:text-white/50 transition-colors"
          >
            Clear
          </button>
        </div>

        {/* Dataset context */}
        <div className="mt-3 glass rounded-lg px-3 py-2 text-xs text-white/40">
          <span className="text-indigo-300">{filteredData.length.toLocaleString()}</span> rows in context
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {aiMessages.length === 0 && (
          <div className="space-y-3">
            <div className="text-center py-4">
              <div className="text-3xl mb-2">✨</div>
              <div className="text-sm text-white/40">Ask AI to analyze your filtered data</div>
            </div>
            <div className="space-y-2">
              {SUGGESTED_QUERIES.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSuggestion(q)}
                  className="w-full text-left glass rounded-xl px-3 py-3 text-xs text-white/50 hover:text-white/80 hover:border-indigo-500/20 border border-transparent transition-all"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {aiMessages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}

        {isAIThinking && <ThinkingIndicator step={aiThinkingStep} />}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-4 border-t border-white/5">
        <div className="flex gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about the data..."
            disabled={isAIThinking}
            className="flex-1 glass rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-indigo-500/40 border border-transparent transition-colors disabled:opacity-50"
          />
          <button
            onClick={handleSend}
            disabled={!query.trim() || isAIThinking}
            className="btn-primary px-4 py-3 rounded-xl text-sm disabled:opacity-40 shrink-0"
          >
            ↑
          </button>
        </div>
      </div>
    </div>
  )
}
