import React, { useState } from 'react';
import { FULL_GOLDEN_DATASET } from '../data/goldenDataset';
import { SAMPLING_METHODOLOGY_DOCS } from '../data/reportData';
import { Search, Download, Filter, FileText, CheckCircle, ShieldAlert, Sparkles, BookOpen } from 'lucide-react';
import { GoldenSample, IntentId, SamplingCategory } from '../types';

export const GoldenDatasetView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIntent, setSelectedIntent] = useState<string>('ALL');
  const [selectedAction, setSelectedAction] = useState<string>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeTab, setActiveTab] = useState<'dataset' | 'methodology'>('dataset');

  const filteredSamples = FULL_GOLDEN_DATASET.filter((sample) => {
    const matchesSearch =
      sample.incoming_text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sample.sampling_reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sample.tweet_id.includes(searchTerm);

    const matchesIntent = selectedIntent === 'ALL' || sample.gold_intent === selectedIntent;
    const matchesAction = selectedAction === 'ALL' || sample.gold_action === selectedAction;
    const matchesCategory = selectedCategory === 'ALL' || sample.sample_category === selectedCategory;

    return matchesSearch && matchesIntent && matchesAction && matchesCategory;
  });

  const downloadJSON = () => {
    const blob = new Blob([JSON.stringify(FULL_GOLDEN_DATASET, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'golden_evaluation_set_175.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadCSV = () => {
    const headers = ['tweet_id', 'incoming_text', 'gold_intent', 'gold_action', 'gold_reply_key_points', 'sampling_reason', 'sample_category'];
    const csvRows = [headers.join(',')];

    for (const s of FULL_GOLDEN_DATASET) {
      const row = [
        s.tweet_id,
        `"${s.incoming_text.replace(/"/g, '""')}"`,
        s.gold_intent,
        s.gold_action,
        `"${s.gold_reply_key_points.replace(/"/g, '""')}"`,
        `"${s.sampling_reason.replace(/"/g, '""')}"`,
        s.sample_category,
      ];
      csvRows.push(row.join(','));
    }

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'golden_evaluation_set_175.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Overview Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20">
                Prompt 3 Deliverable
              </span>
              <h2 className="text-lg font-bold text-white">Golden Evaluation Set (175 Hand-Curated Samples)</h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
              Curated under a multi-tier stratified and boundary-case sampling strategy. Schema conforms to: <code className="text-sky-300 font-mono text-xs">tweet_id, incoming_text, gold_intent, gold_action, gold_reply_key_points, sampling_reason</code>.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              id="export-json-btn"
              type="button"
              onClick={downloadJSON}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-sky-400" />
              <span>Export JSON</span>
            </button>
            <button
              id="export-csv-btn"
              type="button"
              onClick={downloadCSV}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-medium cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex space-x-2 mt-4 pt-3 border-t border-slate-800">
          <button
            onClick={() => setActiveTab('dataset')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              activeTab === 'dataset' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:bg-slate-800'
            }`}
          >
            Interactive Dataset Explorer ({filteredSamples.length} / 175)
          </button>
          <button
            onClick={() => setActiveTab('methodology')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              activeTab === 'methodology' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:bg-slate-800'
            }`}
          >
            Sampling Methodology Document (2 Paragraphs)
          </button>
        </div>
      </div>

      {activeTab === 'methodology' ? (
        /* Sampling Methodology 2-Paragraph Document View */
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-mono text-sky-400 uppercase tracking-wider">Formal Methodology Documentation</span>
            <h3 className="text-lg font-bold text-white mt-1">Stratified & Boundary-Case Sampling Strategy</h3>
            <p className="text-xs text-slate-400 mt-1">
              Authored by Data Engine Lead & Evaluation Specialist for Hiver SDE Intern Assignment (Requirement 2).
            </p>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans bg-slate-950/60 p-5 rounded-xl border border-slate-800/80">
            {SAMPLING_METHODOLOGY_DOCS.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Stratification Breakdown Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider">Routine Queries</span>
              <span className="text-lg font-bold text-emerald-400 block mt-1">45% (78 samples)</span>
              <span className="text-[10px] text-slate-500">Self-serve diagnostics & links</span>
            </div>
            <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider">Escalation Triggers</span>
              <span className="text-lg font-bold text-rose-400 block mt-1">25% (44 samples)</span>
              <span className="text-[10px] text-slate-500">Safety, PII, Human demand</span>
            </div>
            <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider">Ambiguous Queries</span>
              <span className="text-lg font-bold text-amber-400 block mt-1">15% (26 samples)</span>
              <span className="text-[10px] text-slate-500">Low-context, clarifying prompts</span>
            </div>
            <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider">Edge Cases</span>
              <span className="text-lg font-bold text-sky-400 block mt-1">15% (27 samples)</span>
              <span className="text-[10px] text-slate-500">Sarcasm, Slang, Multimodal</span>
            </div>
          </div>
        </div>
      ) : (
        /* Dataset Explorer Table */
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search text, ID, or reason..."
                className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
              />
            </div>

            {/* Intent Filter */}
            <div>
              <select
                value={selectedIntent}
                onChange={(e) => setSelectedIntent(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-sky-500"
              >
                <option value="ALL">All Intents (6 Classes)</option>
                <option value="BATTERY_POWER_HARDWARE">Battery & Hardware</option>
                <option value="APPLE_ID_ACCOUNT_SECURITY">Apple ID & Security</option>
                <option value="IOS_UPDATE_CRASHES">iOS Updates & OS</option>
                <option value="AUDIO_BLUETOOTH_CONNECTIVITY">Audio & Connectivity</option>
                <option value="APPSTORE_BILLING_REFUNDS">App Store Billing</option>
                <option value="ICLOUD_STORAGE_SYNC">iCloud & Photos</option>
              </select>
            </div>

            {/* Action Filter */}
            <div>
              <select
                value={selectedAction}
                onChange={(e) => setSelectedAction(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-sky-500"
              >
                <option value="ALL">All Actions (Auto vs Escalate)</option>
                <option value="AUTO_REPLY">AUTO_REPLY Only</option>
                <option value="ESCALATE">ESCALATE Only</option>
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-sky-500"
              >
                <option value="ALL">All Stratified Categories</option>
                <option value="routine">Routine Canonical Queries</option>
                <option value="escalation_trigger">Escalation Triggers</option>
                <option value="ambiguous">Ambiguous / Vague</option>
                <option value="edge_case">Edge Cases (Sarcasm/Slang)</option>
              </select>
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto max-h-[640px] overflow-y-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead className="bg-slate-950/80 sticky top-0 border-b border-slate-800 text-[11px] uppercase tracking-wider text-slate-400 z-10">
                  <tr>
                    <th className="py-3 px-3 w-16">ID</th>
                    <th className="py-3 px-3 min-w-[260px]">Incoming Customer Tweet</th>
                    <th className="py-3 px-3 w-40">Gold Intent</th>
                    <th className="py-3 px-3 w-28">Gold Action</th>
                    <th className="py-3 px-3 min-w-[240px]">Required Key Resolution Points</th>
                    <th className="py-3 px-3 min-w-[200px]">Sampling Rationale</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredSamples.map((sample) => (
                    <tr key={sample.tweet_id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 px-3 font-mono text-slate-400 text-[11px] align-top">
                        #{sample.tweet_id}
                      </td>
                      <td className="py-3 px-3 text-slate-100 font-sans align-top leading-relaxed">
                        {sample.incoming_text}
                        <div className="mt-1 flex items-center space-x-1 text-[10px]">
                          <span
                            className={`px-1.5 py-0.2 rounded font-medium ${
                              sample.sample_category === 'routine'
                                ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/40'
                                : sample.sample_category === 'escalation_trigger'
                                ? 'bg-rose-950/60 text-rose-300 border border-rose-800/40'
                                : sample.sample_category === 'edge_case'
                                ? 'bg-indigo-950/60 text-indigo-300 border border-indigo-800/40'
                                : 'bg-amber-950/60 text-amber-300 border border-amber-800/40'
                            }`}
                          >
                            {sample.sample_category}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-3 align-top">
                        <span className="font-mono text-[10px] text-sky-300 bg-slate-800 px-2 py-0.5 rounded border border-slate-700/60 block truncate">
                          {sample.gold_intent}
                        </span>
                      </td>
                      <td className="py-3 px-3 align-top">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${
                            sample.gold_action === 'AUTO_REPLY'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                          }`}
                        >
                          {sample.gold_action}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-slate-300 align-top leading-relaxed text-[11px]">
                        {sample.gold_reply_key_points}
                      </td>
                      <td className="py-3 px-3 text-slate-400 align-top leading-relaxed text-[11px] italic">
                        {sample.sampling_reason}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-3 bg-slate-950/80 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
              <span>Showing {filteredSamples.length} of {FULL_GOLDEN_DATASET.length} Golden Samples</span>
              <span>100% Hand-Curated & Validated</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
