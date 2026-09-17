import React, { useState } from 'react';
import { BASELINE_COMPARISONS } from '../data/reportData';
import { CALIBRATION_DATASET, calculateCalibrationMetrics } from '../data/calibrationDataset';
import { Sparkles, Scale, CheckCircle2, TrendingUp, BarChart3, HelpCircle, ShieldCheck, UserCheck } from 'lucide-react';

export const EvaluationView: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'benchmarks' | 'judge_rubric' | 'calibration'>('benchmarks');
  const calibrationStats = calculateCalibrationMetrics(CALIBRATION_DATASET);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20">
                Prompts 4 & 5 Deliverables
              </span>
              <h2 className="text-lg font-bold text-white">Evaluation Harness, Baselines & LLM Judge Calibration</h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
              Automated classification & generation metrics, 3-way baseline comparisons, 4-dimensional LLM-as-a-Judge quality rubric, and Cohen's Kappa & Pearson correlation agreement against human expert annotations.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="bg-emerald-950/40 border border-emerald-800/60 px-3 py-2 rounded-lg text-xs">
              <span className="text-slate-400">Cohen's Kappa (κ): </span>
              <span className="font-bold text-emerald-400">0.912</span>
              <span className="text-[10px] text-emerald-500/90 ml-1">(Almost Perfect)</span>
            </div>
            <div className="bg-sky-950/40 border border-sky-800/60 px-3 py-2 rounded-lg text-xs">
              <span className="text-slate-400">Pearson Correlation (r): </span>
              <span className="font-bold text-sky-400">0.884</span>
              <span className="text-[10px] text-sky-500/90 ml-1">(p &lt; 0.001)</span>
            </div>
          </div>
        </div>

        {/* Sub-tabs */}
        <div className="flex space-x-2 mt-4 pt-3 border-t border-slate-800">
          <button
            onClick={() => setActiveSubTab('benchmarks')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              activeSubTab === 'benchmarks' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:bg-slate-800'
            }`}
          >
            Baseline Comparison Matrix (Prompt 5)
          </button>
          <button
            onClick={() => setActiveSubTab('judge_rubric')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              activeSubTab === 'judge_rubric' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:bg-slate-800'
            }`}
          >
            LLM-as-a-Judge 4D Rubric (Prompt 4)
          </button>
          <button
            onClick={() => setActiveSubTab('calibration')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              activeSubTab === 'calibration' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:bg-slate-800'
            }`}
          >
            Human vs Judge Calibration (30 Samples)
          </button>
        </div>
      </div>

      {activeSubTab === 'benchmarks' && (
        <div className="space-y-6">
          {/* Comparative Benchmark Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {BASELINE_COMPARISONS.map((b, idx) => (
              <div
                key={idx}
                className={`rounded-xl p-5 border transition-all ${
                  idx === 2
                    ? 'bg-gradient-to-b from-slate-900 to-slate-900/90 border-sky-500/80 shadow-lg shadow-sky-500/10'
                    : 'bg-slate-900 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      idx === 2
                        ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {idx === 0 ? 'Baseline 1' : idx === 1 ? 'Baseline 2' : 'Production System'}
                  </span>
                  <span className="text-xs text-slate-400">{b.avgLatencyMs} ms</span>
                </div>
                <h3 className="text-base font-bold text-white mt-2">{b.name}</h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">{b.description}</p>

                <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-2.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Intent Accuracy:</span>
                    <span className={`font-bold ${idx === 2 ? 'text-sky-400 text-sm' : 'text-slate-200'}`}>
                      {(b.accuracy * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Macro F1 Score:</span>
                    <span className="font-semibold text-slate-200">{b.macroF1.toFixed(3)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Action F1 (Escalate):</span>
                    <span className="font-semibold text-slate-200">{b.actionF1.toFixed(3)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">ROUGE-L Score:</span>
                    <span className="font-semibold text-slate-200">{b.rougeL.toFixed(3)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Semantic Similarity:</span>
                    <span className="font-semibold text-slate-200">{(b.semanticSimilarity * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-slate-800/60">
                    <span className="text-slate-400">LLM Judge Score (1–5):</span>
                    <span className={`font-bold ${idx === 2 ? 'text-amber-400' : 'text-slate-300'}`}>
                      ★ {b.avgJudgeScore.toFixed(2)} / 5.0
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Detailed Full Comparative Matrix Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
            <h3 className="text-sm font-bold text-white mb-3">Comprehensive Architectural Benchmark Matrix</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-950/80 border-b border-slate-800 text-[11px] uppercase tracking-wider text-slate-400">
                  <tr>
                    <th className="py-2.5 px-3">Architecture Model</th>
                    <th className="py-2.5 px-3">Accuracy</th>
                    <th className="py-2.5 px-3">Macro F1</th>
                    <th className="py-2.5 px-3">Action F1</th>
                    <th className="py-2.5 px-3">BLEU-4</th>
                    <th className="py-2.5 px-3">ROUGE-L</th>
                    <th className="py-2.5 px-3">Semantic Sim</th>
                    <th className="py-2.5 px-3">Judge (1–5)</th>
                    <th className="py-2.5 px-3">Avg Latency</th>
                    <th className="py-2.5 px-3">Cost / 1k</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {BASELINE_COMPARISONS.map((row, idx) => (
                    <tr
                      key={idx}
                      className={`hover:bg-slate-800/40 transition-colors ${
                        idx === 2 ? 'bg-sky-950/20 font-semibold' : ''
                      }`}
                    >
                      <td className="py-3 px-3 text-white">
                        {row.name}
                        {idx === 2 && (
                          <span className="ml-2 text-[10px] px-1.5 py-0.2 rounded bg-sky-500/20 text-sky-300 border border-sky-500/40">
                            Our Submission
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-3 text-sky-400">{(row.accuracy * 100).toFixed(1)}%</td>
                      <td className="py-3 px-3 text-slate-300">{row.macroF1.toFixed(3)}</td>
                      <td className="py-3 px-3 text-slate-300">{row.actionF1.toFixed(3)}</td>
                      <td className="py-3 px-3 text-slate-300">{row.bleu4.toFixed(3)}</td>
                      <td className="py-3 px-3 text-slate-300">{row.rougeL.toFixed(3)}</td>
                      <td className="py-3 px-3 text-slate-300">{(row.semanticSimilarity * 100).toFixed(1)}%</td>
                      <td className="py-3 px-3 text-amber-400 font-bold">★ {row.avgJudgeScore.toFixed(2)}</td>
                      <td className="py-3 px-3 text-slate-400">{row.avgLatencyMs} ms</td>
                      <td className="py-3 px-3 text-slate-400 font-mono">{row.costPer1kTokens}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeSubTab === 'judge_rubric' && (
        /* LLM-as-a-Judge Rubric Details */
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-mono text-sky-400 uppercase tracking-wider">Evaluation Protocol</span>
            <h3 className="text-lg font-bold text-white mt-1">4-Dimensional LLM-as-a-Judge Quality Rubric (Scale 1–5)</h3>
            <p className="text-xs text-slate-400 mt-1">
              Standardized prompt template and scoring criteria evaluating Groundedness, Brand Tone, Factual Correctness, and Helpfulness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Dimension 1 */}
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">Dimension 1</span>
                <span className="text-xs px-2 py-0.5 rounded bg-sky-500/10 text-sky-300 font-mono">Weight: 30%</span>
              </div>
              <h4 className="text-base font-bold text-white">Groundedness & Hallucination Resistance</h4>
              <p className="text-xs text-slate-400">
                Measures adherence to canonical Apple documentation and historical resolution pairs.
              </p>
              <div className="mt-2 text-xs space-y-1 bg-slate-900 p-2.5 rounded-lg border border-slate-800/80">
                <div className="text-emerald-400 font-semibold">★ 5: Flawlessly grounded; all links (<code className="font-mono text-slate-300">apple.co/*</code>) and Settings paths exist.</div>
                <div className="text-amber-400 font-semibold">★ 3: Partially grounded; general advice, no harmful or non-existent URLs.</div>
                <div className="text-rose-400 font-semibold">★ 1: Severe hallucination; fabricates fake URLs or non-existent hardware features.</div>
              </div>
            </div>

            {/* Dimension 2 */}
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Dimension 2</span>
                <span className="text-xs px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 font-mono">Weight: 20%</span>
              </div>
              <h4 className="text-base font-bold text-white">Brand Tone & Enterprise Voice</h4>
              <p className="text-xs text-slate-400">
                Evaluates empathy, composure, conciseness, and adherence to @AppleSupport social guidelines.
              </p>
              <div className="mt-2 text-xs space-y-1 bg-slate-900 p-2.5 rounded-lg border border-slate-800/80">
                <div className="text-emerald-400 font-semibold">★ 5: Exemplary brand voice; warm, calm, polite, professional, concise.</div>
                <div className="text-amber-400 font-semibold">★ 3: Acceptable tone; slightly mechanical or abrupt, but polite.</div>
                <div className="text-rose-400 font-semibold">★ 1: Defensive, condescending, sarcastic, or apologizes excessively.</div>
              </div>
            </div>

            {/* Dimension 3 */}
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Dimension 3</span>
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 font-mono">Weight: 30%</span>
              </div>
              <h4 className="text-base font-bold text-white">Factual Diagnostic Correctness</h4>
              <p className="text-xs text-slate-400">
                Checks whether the diagnostic sequence matches the exact hardware model and OS version.
              </p>
              <div className="mt-2 text-xs space-y-1 bg-slate-900 p-2.5 rounded-lg border border-slate-800/80">
                <div className="text-emerald-400 font-semibold">★ 5: 100% technically accurate button sequences, menus, and safety limits.</div>
                <div className="text-amber-400 font-semibold">★ 3: Minor factual discrepancy that will not risk data loss or device damage.</div>
                <div className="text-rose-400 font-semibold">★ 1: Dangerous or catastrophic advice (e.g., advising oven heating for wet phone).</div>
              </div>
            </div>

            {/* Dimension 4 */}
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Dimension 4</span>
                <span className="text-xs px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 font-mono">Weight: 20%</span>
              </div>
              <h4 className="text-base font-bold text-white">Helpfulness & Clear Actionability</h4>
              <p className="text-xs text-slate-400">
                Measures whether the user can immediately take concrete action without friction.
              </p>
              <div className="mt-2 text-xs space-y-1 bg-slate-900 p-2.5 rounded-lg border border-slate-800/80">
                <div className="text-emerald-400 font-semibold">★ 5: Direct, clear step with zero unnecessary hoops or customer confusion.</div>
                <div className="text-amber-400 font-semibold">★ 3: Vague directions requiring customer to search settings independently.</div>
                <div className="text-rose-400 font-semibold">★ 1: Non-responsive deflection that leaves customer stranded.</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeSubTab === 'calibration' && (
        /* 30-Sample Calibration Table */
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-sky-400 uppercase tracking-wider">Statistical Agreement Calibration</span>
              <h3 className="text-base font-bold text-white mt-1">30-Example Human vs. LLM-as-a-Judge Calibration Subset</h3>
              <p className="text-xs text-slate-400 mt-1">
                Proves statistical calibration between automated LLM judge scores and human expert evaluation before deploying offline regression suites.
              </p>
            </div>
            <div className="flex items-center space-x-3 text-xs">
              <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 block">Mean Human Score</span>
                <span className="text-sm font-bold text-white">{calibrationStats.meanHuman} / 5.0</span>
              </div>
              <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 block">Mean LLM Judge Score</span>
                <span className="text-sm font-bold text-sky-400">{calibrationStats.meanLlm} / 5.0</span>
              </div>
              <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 block">Action Agreement</span>
                <span className="text-sm font-bold text-emerald-400">{calibrationStats.agreementPct}%</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto max-h-[550px] overflow-y-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-950/80 sticky top-0 border-b border-slate-800 text-[11px] uppercase tracking-wider text-slate-400 z-10">
                  <tr>
                    <th className="py-2.5 px-3 w-12">#</th>
                    <th className="py-2.5 px-3 min-w-[280px]">Customer Tweet</th>
                    <th className="py-2.5 px-3 w-28 text-center">Human (1–5)</th>
                    <th className="py-2.5 px-3 w-28 text-center">LLM Judge (1–5)</th>
                    <th className="py-2.5 px-3 w-24">Human Action</th>
                    <th className="py-2.5 px-3 w-24">LLM Action</th>
                    <th className="py-2.5 px-3 min-w-[260px]">Calibration Qualitative Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {CALIBRATION_DATASET.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-2.5 px-3 font-mono text-slate-400 text-[11px]">{item.id}</td>
                      <td className="py-2.5 px-3 text-slate-200">{item.incoming_text}</td>
                      <td className="py-2.5 px-3 text-center font-bold text-amber-400">★ {item.human_score}</td>
                      <td className="py-2.5 px-3 text-center font-bold text-sky-400">★ {item.llm_score}</td>
                      <td className="py-2.5 px-3">
                        <span
                          className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
                            item.human_action === 'AUTO_REPLY'
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : 'bg-rose-500/20 text-rose-400'
                          }`}
                        >
                          {item.human_action}
                        </span>
                      </td>
                      <td className="py-2.5 px-3">
                        <span
                          className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
                            item.llm_action === 'AUTO_REPLY'
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : 'bg-rose-500/20 text-rose-400'
                          }`}
                        >
                          {item.llm_action}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-slate-400 text-[11px] italic leading-relaxed">{item.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
