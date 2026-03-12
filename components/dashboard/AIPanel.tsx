"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/store";
import { streamGeminiResponse, buildPrompt } from "@/lib/gemini";
import { AIMessage } from "@/types";

const QUICK_QUERIES = [
  "Which state shows highest literacy growth?",
  "Compare agriculture output between states",
  "Give trend analysis for health index",
  "Identify top GDP contributing states",
];

function MessageBubble({ msg }: { msg: AIMessage }) {
  if (msg.role === "user") {
    return (
      <div className="flex justify-end mb-3">
        <div className="bg-violet-600/30 border border-violet-500/30 rounded-xl rounded-tr-sm px-4 py-2 max-w-[85%] text-sm text-white">
          {msg.content}
        </div>
      </div>
    );
  }

  // Render markdown-like formatting
  const formatted = msg.content
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br/>');

  return (
    <div className="flex justify-start mb-3">
      <div className="flex gap-2 max-w-[95%]">
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0 mt-1">✦</div>
        <div className="bg-white/4 border border-white/8 rounded-xl rounded-tl-sm px-4 py-3 text-sm text-gray-200 leading-relaxed">
          <div dangerouslySetInnerHTML={{ __html: formatted }} />
          {msg.isStreaming && <span className="inline-block w-2 h-4 bg-violet-400 ml-1 cursor-blink align-middle" />}
        </div>
      </div>
    </div>
  );
}

export function AIPanel() {
  const { filteredData, aiMessages, isAIThinking, addMessage, updateLastMessage, setIsAIThinking } = useAppStore();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [aiMessages, isAIThinking]);

  async function runQuery(query: string) {
    if (!query.trim() || isAIThinking) return;

    const userMsg: AIMessage = { id: Date.now() + "-u", role: "user", content: query, timestamp: new Date() };
    addMessage(userMsg);
    setIsAIThinking(true);
    setInput("");

    // Build context from filtered data
    const sample = filteredData.slice(0, 100);
    const states = [...new Set(sample.map((r) => r.state))].join(", ");
    const avgLit = (sample.reduce((a, b) => a + b.literacyRate, 0) / sample.length).toFixed(1);
    const avgGdp = (sample.reduce((a, b) => a + b.gdpContribution, 0) / sample.length).toFixed(2);
    const avgHealth = (sample.reduce((a, b) => a + b.healthIndex, 0) / sample.length).toFixed(1);
    const context = `Total rows: ${filteredData.length}. States: ${states}. Avg Literacy: ${avgLit}%. Avg GDP: ${avgGdp}%. Avg Health Index: ${avgHealth}. Years: ${[...new Set(sample.map((r) => r.year))].sort().join(", ")}.`;
    const prompt = buildPrompt(context, query);

    const aiMsg: AIMessage = { id: Date.now() + "-a", role: "assistant", content: "", timestamp: new Date(), isStreaming: true };
    addMessage(aiMsg);
    setIsAIThinking(false);

    let accumulated = "";
    for await (const chunk of streamGeminiResponse(prompt, (chunk) => {
      accumulated += chunk;
      updateLastMessage(accumulated);
    })) {
      // streaming happens via callback
    }
  }

  return (
    <motion.aside initial={{ x: 320 }} animate={{ x: 0 }} exit={{ x: 320 }}
      className="w-80 flex-shrink-0 border-l border-white/5 bg-[#0a0a0f] flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center text-[10px] text-white font-bold">✦</div>
          <span className="font-semibold text-white text-sm">AI Insight Panel</span>
          <div className="ml-auto flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] text-emerald-400">Gemini</span>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Analyzing <span className="text-violet-300 font-medium">{filteredData.length.toLocaleString()}</span> rows
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        {aiMessages.length === 0 && (
          <div className="space-y-2 mb-4">
            <p className="text-xs text-gray-500 mb-3">Quick queries:</p>
            {QUICK_QUERIES.map((q) => (
              <button key={q} onClick={() => runQuery(q)}
                className="w-full text-left px-3 py-2 text-xs text-gray-400 hover:text-white bg-white/3 hover:bg-white/6 border border-white/5 hover:border-violet-500/30 rounded-lg transition-all">
                {q}
              </button>
            ))}
          </div>
        )}

        {aiMessages.map((msg) => <MessageBubble key={msg.id} msg={msg} />)}

        {isAIThinking && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 px-4 py-3 bg-white/3 rounded-xl">
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <motion.span key={i} animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                  className="w-1.5 h-1.5 rounded-full bg-violet-400 inline-block" />
              ))}
            </div>
            <span className="text-xs text-gray-400">Thinking...</span>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-white/5">
        <div className="flex gap-2">
          <input value={input} onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && runQuery(input)}
            placeholder="Ask about the data..."
            className="flex-1 bg-white/4 border border-white/8 rounded-lg px-3 py-2 text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-violet-500/50 transition-all" />
          <button onClick={() => runQuery(input)} disabled={!input.trim() || isAIThinking}
            className="px-3 py-2 bg-gradient-to-r from-violet-600 to-blue-600 rounded-lg text-white text-sm font-medium disabled:opacity-40 hover:from-violet-500 hover:to-blue-500 transition-all">
            ↑
          </button>
        </div>
        <div className="mt-2 flex justify-end">
          <button onClick={() => useAppStore.getState().clearMessages()}
            className="text-[10px] text-gray-600 hover:text-gray-400 transition-colors">
            Clear history
          </button>
        </div>
      </div>
    </motion.aside>
  );
}
