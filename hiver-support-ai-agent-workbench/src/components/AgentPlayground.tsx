import React, { useState } from 'react';
import { Send, AlertTriangle, CheckCircle2, ArrowRight, ShieldAlert, Zap, BookOpen, Clock, Copy, Check, MessageSquare } from 'lucide-react';
import { AgentResponse, IntentId } from '../types';
import { INTENT_TAXONOMY } from '../data/taxonomy';

interface AgentPlaygroundProps {
  onRunAgent: (text: string) => Promise<AgentResponse>;
  loading: boolean;
  result: AgentResponse | null;
}

const PRESET_TWEETS = [
  {
    label: '🔋 Routine Battery Drain',
    type: 'Routine',
    text: '@AppleSupport My iPhone 11 battery is draining way faster since I updated to iOS 16.3 yesterday. What can I do?',
  },
  {
    label: '🎭 Sarcasm Edge Case',
    type: 'Edge Case',
    text: '@AppleSupport Oh WOW thank you SO much Apple for the amazing new feature where my battery dies in 12 minutes flat! Truly revolutionary craftsmanship 👏👏👏',
  },
  {
    label: '🔥 Safety Hazard (Thermal)',
    type: 'Escalate',
    text: '@AppleSupport My battery literally swelled up and cracked the glass back of my iPhone 11. It smells like burning chemicals right now.',
  },
  {
    label: '💳 PII Leakage Alert',
    type: 'Escalate',
    text: '@AppleSupport you billed my stolen card $800. Here is my credit card: 4111-2222-3333-4444 and CVV 123.',
  },
  {
    label: '👤 Explicit Human Demand',
    type: 'Escalate',
    text: '@AppleSupport I WANT TO TALK TO A REAL HUMAN AGENT RIGHT NOW. Stop giving me these useless automated bot links!',
  },
  {
    label: '🖼️ Multimodal Reference',
    type: 'Edge Case',
    text: '@AppleSupport look at this screenshot I attached below, why is the cloud icon crossed out with a red slash?',
  },
  {
    label: '🌐 Spanish Language',
    type: 'Edge Case',
    text: '@AppleSupport Hola, mi cuenta de iCloud está bloqueada y no puedo acceder a mis fotos. ¿Me pueden ayudar?',
  },
  {
    label: '❓ Ambiguous Query',
    type: 'Ambiguous',
    text: '@AppleSupport it is not working.',
  },
];

export const AgentPlayground: React.FC<AgentPlaygroundProps> = ({ onRunAgent, loading, result }) => {
  const [inputText, setInputText] = useState(PRESET_TWEETS[0].text);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || loading) return;
    onRunAgent(inputText);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentIntentMeta = result ? INTENT_TAXONOMY.find((i) => i.id === result.intent) : null;

  return (
    <div className="space-y-6">
      {/* Top Banner Context */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20">
                Stage 1 → Stage 2 → Stage 3
              </span>
              <h2 className="text-lg font-bold text-white">Interactive 3-Stage Support Agent Testbed</h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Simulate the complete @AppleSupport AI Agent. Evaluates incoming tweets through Intent Classification, RAG Historical Resolution Retrieval, and the Multi-Trigger Escalation Decision Matrix.
            </p>
          </div>
          <div className="flex items-center space-x-2 text-xs text-slate-400 bg-slate-800/80 px-3 py-2 rounded-lg border border-slate-700/60">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>Strict Pydantic JSON Output Enforced</span>
          </div>
        </div>
      </div>

      {/* Preset Pickers */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
          Select Curated Sample Tweet or Type Below
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {PRESET_TWEETS.map((preset, idx) => (
            <button
              key={idx}
              id={`preset-btn-${idx}`}
              type="button"
              onClick={() => {
                setInputText(preset.text);
                onRunAgent(preset.text);
              }}
              className={`text-left p-2.5 rounded-lg border text-xs transition-all cursor-pointer ${
                inputText === preset.text
                  ? 'bg-sky-950/40 border-sky-500 text-sky-200 shadow-sm'
                  : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/50'
              }`}
            >
              <div className="font-semibold truncate">{preset.label}</div>
              <div className="text-[10px] text-slate-400 mt-0.5 flex items-center justify-between">
                <span>{preset.type}</span>
                <ArrowRight className="w-2.5 h-2.5 opacity-60" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Input Form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative rounded-xl border border-slate-700 bg-slate-900 shadow-sm overflow-hidden focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500">
          <textarea
            id="tweet-input"
            rows={3}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type any incoming customer tweet for @AppleSupport..."
            className="w-full bg-transparent px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none resize-none font-sans"
          />
          <div className="flex items-center justify-between px-4 py-2.5 bg-slate-800/60 border-t border-slate-800 text-xs text-slate-400">
            <span className="flex items-center space-x-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
              <span>Target: @AppleSupport</span>
              <span className="text-slate-500">•</span>
              <span>{inputText.length} chars</span>
            </span>
            <button
              id="run-agent-btn"
              type="submit"
              disabled={loading || !inputText.trim()}
              className="flex items-center space-x-2 px-4 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 disabled:opacity-50 text-white font-medium shadow-sm transition-all cursor-pointer"
            >
              {loading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Processing Stages...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Run 3-Stage Pipeline</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Results View */}
      {result && (
        <div className="space-y-5 animate-in fade-in duration-300">
          {/* Executive Header Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Intent Badge */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Stage 1: Intent
              </span>
              <div className="text-base font-bold text-white mt-1 truncate">
                {result.intentName}
              </div>
              <div className="mt-2 flex items-center justify-between text-xs">
                <span className="text-slate-400">Confidence:</span>
                <span className="font-semibold text-sky-400">{(result.confidence * 100).toFixed(0)}%</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                <div
                  className="bg-sky-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${result.confidence * 100}%` }}
                />
              </div>
            </div>

            {/* Action Decision */}
            <div
              className={`rounded-xl p-4 border ${
                result.action === 'AUTO_REPLY'
                  ? 'bg-emerald-950/30 border-emerald-800/60'
                  : 'bg-rose-950/30 border-rose-800/60'
              }`}
            >
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Stage 3: Decision
              </span>
              <div className="flex items-center space-x-2 mt-1">
                {result.action === 'AUTO_REPLY' ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span className="text-base font-bold text-emerald-300">AUTO_REPLY</span>
                  </>
                ) : (
                  <>
                    <ShieldAlert className="w-5 h-5 text-rose-400" />
                    <span className="text-base font-bold text-rose-300">ESCALATE_TO_HUMAN</span>
                  </>
                )}
              </div>
              <div className="text-xs text-slate-300 mt-2 truncate">
                {result.action === 'AUTO_REPLY' ? 'Safe for Autonomous Bot Response' : 'Routed to Human Specialist'}
              </div>
            </div>

            {/* Sentiment Gauge */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Customer Sentiment
              </span>
              <div className="text-base font-bold text-white mt-1">
                {result.sentiment_score <= -0.5
                  ? '🔴 Highly Negative / Hostile'
                  : result.sentiment_score < 0
                  ? '🟠 Mildly Frustrated'
                  : '🟢 Neutral / Calm'}
              </div>
              <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
                <span>Score: {result.sentiment_score.toFixed(2)}</span>
                <span className="text-[10px]">Range: [-1.0, +1.0]</span>
              </div>
            </div>

            {/* Latency Breakdown */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                <span>Pipeline Latency</span>
                <Clock className="w-3.5 h-3.5 text-slate-500" />
              </span>
              <div className="text-base font-bold text-white mt-1">
                {result.stage_latencies_ms.total} ms
              </div>
              <div className="text-[10px] text-slate-400 mt-2 space-y-0.5">
                <div className="flex justify-between">
                  <span>Intent / RAG / Reply:</span>
                  <span className="text-slate-300">
                    {result.stage_latencies_ms.intent_classification}ms / {result.stage_latencies_ms.rag_retrieval}ms / {result.stage_latencies_ms.reply_generation}ms
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Generated Official Response Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xs text-white">
                  
                </div>
                <div>
                  <div className="text-sm font-bold text-white flex items-center space-x-1.5">
                    <span>Apple Support</span>
                    <span className="text-sky-400 text-xs">☑</span>
                    <span className="text-xs text-slate-400 font-normal">@AppleSupport</span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {result.action === 'AUTO_REPLY' ? 'Autonomous Grounded Reply' : 'Handoff Routing Reply'}
                  </div>
                </div>
              </div>
              <button
                id="copy-reply-btn"
                type="button"
                onClick={() => handleCopy(result.reply)}
                className="flex items-center space-x-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 transition-all cursor-pointer"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <div className="text-sm sm:text-base text-slate-100 leading-relaxed font-sans bg-slate-950/60 p-4 rounded-lg border border-slate-800/80">
              {result.reply}
            </div>

            {/* Escalation details if applicable */}
            {result.action === 'ESCALATE' && result.escalation_reason && (
              <div className="mt-4 p-3 rounded-lg bg-rose-950/20 border border-rose-800/40 flex items-start space-x-3 text-xs text-rose-300">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-rose-200">Escalation Trigger Rationale:</div>
                  <div className="mt-0.5">{result.escalation_reason}</div>
                  <div className="text-[11px] text-rose-400/80 mt-1 font-mono">
                    Triggered Rule: {result.rule_triggered}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Deep-Dive 3-Stage Pipeline Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Stage 1 & 3: Intent & Decision Logic */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-sky-400" />
                <span>Stage 1 & Stage 3: Classification & Decision Engine</span>
              </h3>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Classified Intent ID:</span>
                  <span className="font-mono text-sky-300 font-semibold">{result.intent}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Intent Scope:</span>
                  <span className="text-slate-200 text-right max-w-xs">{currentIntentMeta?.description}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Matched Keywords:</span>
                  <span className="text-slate-300 text-right">
                    {currentIntentMeta?.keywords.slice(0, 5).join(', ')}...
                  </span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Canonical Escalation Rate:</span>
                  <span className="text-slate-300 font-semibold">{currentIntentMeta?.escalationRatePct}% in TWCS</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-400">Decision Rule Applied:</span>
                  <span className="font-mono text-amber-300">{result.rule_triggered}</span>
                </div>
              </div>
            </div>

            {/* Stage 2: Grounded Historical RAG Retrieval Context */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <BookOpen className="w-4 h-4 text-emerald-400" />
                <span>Stage 2: Grounded Historical Resolution Pairs (RAG)</span>
              </h3>

              {result.retrieved_context && result.retrieved_context.length > 0 ? (
                <div className="space-y-3">
                  {result.retrieved_context.map((ctx, idx) => (
                    <div key={idx} className="bg-slate-950/60 p-3 rounded-lg border border-slate-800 text-xs space-y-2">
                      <div className="flex items-center justify-between text-slate-400">
                        <span className="font-mono text-[10px] text-slate-500">Source: {ctx.id}</span>
                        <span className="text-emerald-400 font-semibold text-[10px]">
                          Similarity: {(ctx.similarityScore * 100).toFixed(0)}%
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 font-medium">Historical Query: </span>
                        <span className="text-slate-200 italic">"{ctx.customerQuery}"</span>
                      </div>
                      <div>
                        <span className="text-slate-400 font-medium">Resolution Pattern: </span>
                        <span className="text-slate-300">{ctx.officialReply}</span>
                      </div>
                      {ctx.sourceUrl && (
                        <div className="pt-1 flex items-center space-x-1.5 text-sky-400 text-[11px]">
                          <span>Verified URL:</span>
                          <span className="font-mono underline">{ctx.sourceUrl}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-xs text-slate-400 italic">
                  No direct vector pairs returned for this intent.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
