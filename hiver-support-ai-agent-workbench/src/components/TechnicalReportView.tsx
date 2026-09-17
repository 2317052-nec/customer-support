import React, { useState } from 'react';
import { TOP_5_FAILURE_MODES, MISLEADING_HEADLINE_ANALYSIS, ENGINEERING_DECISION_LOG } from '../data/reportData';
import { AlertOctagon, HelpCircle, FileText, CheckCircle2, ChevronDown, ChevronRight, ShieldAlert, Zap } from 'lucide-react';

export const TechnicalReportView: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'misleading' | 'failures' | 'decision_log'>('misleading');
  const [expandedFailure, setExpandedFailure] = useState<string | null>('fail_1');

  return (
    <div className="space-y-6">
      {/* Executive Report Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20">
                Prompt 5 Deliverable • Whitepaper
              </span>
              <h2 className="text-lg font-bold text-white">Technical Report, Failure Modes & Engineering Decision Log</h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
              Comprehensive analysis addressing failure modes, baseline comparisons, non-obvious engineering trade-offs, and the mandatory self-critique: <em>"What is misleading about my headline number?"</em>
            </p>
          </div>
          <div className="flex items-center space-x-2 text-xs">
            <span className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 font-mono">
              14 Logged Trade-offs
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-2 mt-4 pt-3 border-t border-slate-800">
          <button
            onClick={() => setActiveSection('misleading')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              activeSection === 'misleading' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:bg-slate-800'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>"What is Misleading About My Headline Number?"</span>
          </button>
          <button
            onClick={() => setActiveSection('failures')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              activeSection === 'failures' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:bg-slate-800'
            }`}
          >
            <AlertOctagon className="w-3.5 h-3.5" />
            <span>Top 5 Failure Modes & Mitigations</span>
          </button>
          <button
            onClick={() => setActiveSection('decision_log')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              activeSection === 'decision_log' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:bg-slate-800'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>14 Engineering Decisions & Trade-Offs</span>
          </button>
        </div>
      </div>

      {/* Section 1: What is Misleading About My Headline Number? */}
      {activeSection === 'misleading' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-mono text-amber-400 uppercase tracking-wider font-semibold">
              Mandatory Analytical Section (Prompt 5 Requirement)
            </span>
            <h3 className="text-xl font-bold text-white mt-1">
              "What is Misleading About My Headline Number?"
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              A rigorous engineering interrogation of why a 93.7% accuracy / 0.928 Macro-F1 offline score overstates true production efficacy.
            </p>
          </div>

          <div className="space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
            {/* Subsection 1 */}
            <div className="bg-slate-950/60 p-5 rounded-xl border border-slate-800/80 space-y-3">
              <h4 className="text-base font-bold text-white flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>1. Dataset Selection Bias & The "Survivorship of the Dissatisfied"</span>
              </h4>
              <p>
                The Twitter Customer Support dataset from Kaggle reflects a heavily skewed, adversarial slice of enterprise interactions. Customers rarely tweet at @AppleSupport when an iCloud sync completes seamlessly or an iOS update installs without issue; Twitter is overwhelmingly an avenue of last resort used by users who have already failed self-service web guides or telephony IVR queues.
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-400 pl-2">
                <li>
                  <strong className="text-slate-200">The "DM Handshake" Ceiling:</strong> Over 60% of official @AppleSupport tweets historically consist of <em>"Please send us a DM with your Apple ID and iOS version so we can investigate."</em> An offline evaluation that measures textual generation against historical tweets risks rewarding the model simply for memorizing DM routing canned responses rather than measuring true end-to-end task resolution.
                </li>
                <li>
                  <strong className="text-slate-200">Adversarial Sentiment Drift:</strong> While our agent achieves a 93.7% accuracy on our curated golden set, in live production, the distribution of sentiment is far more volatile than offline splits suggest.
                </li>
              </ul>
            </div>

            {/* Subsection 2 */}
            <div className="bg-slate-950/60 p-5 rounded-xl border border-slate-800/80 space-y-3">
              <h4 className="text-base font-bold text-white flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-rose-400" />
                <span>2. The Semantic Flaws of Traditional Automated Metrics (BLEU & ROUGE)</span>
              </h4>
              <p>
                In customer support evaluation, BLEU-4 and ROUGE-L are fundamentally flawed proxy metrics:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-400 pl-2">
                <li>
                  <strong className="text-slate-200">Penalizing Valid Paraphrases:</strong> In support, there are dozens of equally helpful, empathetic ways to formulate advice. For example, advising a user to <em>"force restart by pressing Volume Up, Volume Down, and holding Power"</em> vs. <em>"hard reset your device using the hardware buttons"</em> yields near-zero n-gram overlap (BLEU &lt; 0.15) despite identical technical utility.
                </li>
                <li>
                  <strong className="text-slate-200">Rewarding Hallucinatory Politeness:</strong> A model that outputs 80 tokens of generic corporate sympathy (<em>"We are so deeply sorry to hear about your experience with our product and we value you as our customer..."</em>) scores high ROUGE recall against human conversational fluff while failing to provide the single technical link needed to fix the device.
                </li>
                <li>
                  <strong className="text-slate-200">Failure to Detect Factual Hallucinations:</strong> Standard metrics cannot distinguish between <code className="font-mono text-emerald-300">apple.co/BatteryHealth</code> and a hallucinated or phishing URL like <code className="font-mono text-rose-300">apple-support-verify.com</code>. A single corrupted token creates a catastrophic security vulnerability that BLEU-4 ignores.
                </li>
              </ul>
            </div>

            {/* Subsection 3 */}
            <div className="bg-slate-950/60 p-5 rounded-xl border border-slate-800/80 space-y-3">
              <h4 className="text-base font-bold text-white flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-sky-400" />
                <span>3. Offline Single-Turn Evaluation Cannot Measure Multi-Turn State Drift</span>
              </h4>
              <p>
                Our offline harness evaluates incoming tweets in isolation. In live operations:
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-400 pl-2">
                <li>
                  A user whose initial query was auto-handled with diagnostic steps may reply two minutes later with angry feedback or clarifying symptoms.
                </li>
                <li>
                  An agent with 93.7% single-turn intent accuracy exhibits compounding errors in multi-turn dialogues (<strong>0.937³ ≈ 82.3%</strong> over 3 turns), leading to customer churn if the agent does not maintain a persistent conversational state and escalation memory.
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Section 2: Top 5 Failure Modes */}
      {activeSection === 'failures' && (
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <span className="text-xs font-mono text-sky-400 uppercase tracking-wider">Error Analysis & Mitigations</span>
            <h3 className="text-base font-bold text-white mt-1">Top 5 Systemic Failure Modes</h3>
            <p className="text-xs text-slate-400 mt-1">
              Deep-dive case studies detailing concrete tweet examples, actual model behavior, root-cause hypotheses, and architectural mitigations.
            </p>
          </div>

          <div className="space-y-3">
            {TOP_5_FAILURE_MODES.map((fail) => {
              const isExpanded = expandedFailure === fail.id;
              return (
                <div
                  key={fail.id}
                  className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden transition-all"
                >
                  <div
                    onClick={() => setExpandedFailure(isExpanded ? null : fail.id)}
                    className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-800/50"
                  >
                    <div className="flex items-center space-x-3">
                      <span
                        className={`text-xs px-2 py-0.5 rounded font-bold ${
                          fail.impactSeverity === 'Critical'
                            ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                            : fail.impactSeverity === 'High'
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            : 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                        }`}
                      >
                        {fail.impactSeverity}
                      </span>
                      <span className="text-sm font-bold text-white">{fail.title}</span>
                      <span className="text-xs text-slate-400 hidden sm:inline">• {fail.category}</span>
                    </div>
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    )}
                  </div>

                  {isExpanded && (
                    <div className="p-4 border-t border-slate-800 bg-slate-950/60 space-y-4 text-xs">
                      <div>
                        <span className="text-slate-400 font-semibold block mb-1 uppercase tracking-wider text-[10px]">
                          Incoming Customer Tweet:
                        </span>
                        <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 italic">
                          "{fail.tweetExample}"
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="p-3 rounded-lg bg-rose-950/20 border border-rose-800/40 space-y-1">
                          <span className="font-semibold text-rose-300">Model Output (Erroneous):</span>
                          <div className="text-slate-300 font-mono text-[11px]">
                            Intent: {fail.actualModelOutput.intent} | Action: {fail.actualModelOutput.action}
                          </div>
                          <div className="text-slate-400">{fail.actualModelOutput.reply}</div>
                        </div>

                        <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-800/40 space-y-1">
                          <span className="font-semibold text-emerald-300">Gold Target Behavior:</span>
                          <div className="text-slate-300 font-mono text-[11px]">
                            Intent: {fail.expectedGoldOutput.intent} | Action: {fail.expectedGoldOutput.action}
                          </div>
                          <div className="text-slate-400">{fail.expectedGoldOutput.rationale}</div>
                        </div>
                      </div>

                      <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                        <span className="font-bold text-amber-400 uppercase tracking-wider text-[10px]">
                          Root Cause Hypothesis:
                        </span>
                        <p className="text-slate-300 leading-relaxed">{fail.rootCauseHypothesis}</p>
                      </div>

                      <div className="p-3 rounded-lg bg-sky-950/20 border border-sky-800/40 space-y-1">
                        <span className="font-bold text-sky-300 uppercase tracking-wider text-[10px]">
                          Concrete Engineering Mitigation:
                        </span>
                        <p className="text-slate-200 leading-relaxed">{fail.concreteMitigation}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Section 3: Engineering Decision Log */}
      {activeSection === 'decision_log' && (
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <span className="text-xs font-mono text-sky-400 uppercase tracking-wider">Architecture Governance</span>
            <h3 className="text-base font-bold text-white mt-1">14 Non-Obvious Engineering Decisions & Trade-Offs</h3>
            <p className="text-xs text-slate-400 mt-1">
              Rigorous decision log detailing alternatives considered, selected approach, trade-offs accepted, and production impact.
            </p>
          </div>

          <div className="space-y-3">
            {ENGINEERING_DECISION_LOG.map((entry) => (
              <div
                key={entry.id}
                className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3 text-xs"
              >
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="flex items-center space-x-2">
                    <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-300 font-mono text-[10px] flex items-center justify-center font-bold">
                      {entry.id}
                    </span>
                    <h4 className="font-bold text-white text-sm">{entry.decision}</h4>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Alternatives Considered:</span>
                    <ul className="list-disc list-inside text-slate-400 pl-1">
                      {entry.alternativesConsidered.map((alt, idx) => (
                        <li key={idx}>{alt}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-emerald-400">Chosen Approach:</span>
                    <p className="text-slate-200">{entry.chosenApproach}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-slate-800/60">
                  <div className="space-y-0.5">
                    <span className="text-[10px] uppercase font-bold text-amber-400">Trade-Off Accepted:</span>
                    <p className="text-slate-300">{entry.tradeOffAccepted}</p>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[10px] uppercase font-bold text-sky-400">Production Impact:</span>
                    <p className="text-slate-300">{entry.productionImpact}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
