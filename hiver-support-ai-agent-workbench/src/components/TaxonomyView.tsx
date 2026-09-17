import React, { useState } from 'react';
import { INTENT_TAXONOMY } from '../data/taxonomy';
import { Search, Tag, MessageCircle, AlertCircle, ArrowUpRight } from 'lucide-react';

export const TaxonomyView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIntentId, setSelectedIntentId] = useState<string | null>(INTENT_TAXONOMY[0].id);

  const filteredIntents = INTENT_TAXONOMY.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.keywords.some((k) => k.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const selectedIntent = INTENT_TAXONOMY.find((i) => i.id === selectedIntentId) || INTENT_TAXONOMY[0];

  return (
    <div className="space-y-6">
      {/* Top Overview */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20">
                Prompt 1 Deliverable
              </span>
              <h2 className="text-lg font-bold text-white">Intent Taxonomy & Dataset Subsampling Hub</h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
              Cleaned, filtered, and clustered the Kaggle Customer Support dataset (<code className="text-sky-300 font-mono text-xs">thoughtvector/customer-support-on-twitter</code>) specifically for multi-turn conversations of <strong>@AppleSupport</strong>. Identified 6 orthogonal customer intent categories using TF-IDF + KMeans elbow curve validation.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="bg-slate-800/80 px-3 py-2 rounded-lg border border-slate-700/60 text-xs">
              <span className="text-slate-400">Total Dialogue Turns: </span>
              <span className="font-bold text-white">125,000+</span>
            </div>
            <div className="bg-slate-800/80 px-3 py-2 rounded-lg border border-slate-700/60 text-xs">
              <span className="text-slate-400">Core Intents: </span>
              <span className="font-bold text-sky-400">6 Clusters</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Intent Cards */}
        <div className="lg:col-span-5 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search taxonomy keywords or intents..."
              className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
            />
          </div>

          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
            {filteredIntents.map((intent) => {
              const isSelected = selectedIntent.id === intent.id;
              return (
                <div
                  key={intent.id}
                  id={`intent-card-${intent.id}`}
                  onClick={() => setSelectedIntentId(intent.id)}
                  className={`p-3.5 rounded-xl border text-xs transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-800/90 border-sky-500 shadow-md shadow-sky-500/10'
                      : 'bg-slate-900 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-white">{intent.name}</span>
                    <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-sky-400 border border-slate-700">
                      {intent.historicalVolumePct}% vol
                    </span>
                  </div>
                  <p className="text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {intent.description}
                  </p>
                  <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center space-x-1">
                      <Tag className="w-3 h-3 text-slate-500" />
                      <span>{intent.keywords.length} keywords</span>
                    </span>
                    <span className="text-amber-400/90 font-medium">
                      {intent.escalationRatePct}% escalation
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Selected Intent Detail Dossier */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm space-y-5">
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <div className="text-xs font-mono text-sky-400 uppercase tracking-wider">
                  Intent ID: {selectedIntent.id}
                </div>
                <h3 className="text-xl font-bold text-white mt-1">{selectedIntent.name}</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {selectedIntent.description}
                </p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/20 text-sky-300 border border-sky-500/30">
                {selectedIntent.tag}
              </span>
            </div>

            {/* Metrics Breakdown */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Historical Volume</span>
                <span className="text-lg font-bold text-white">{selectedIntent.historicalVolumePct}%</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">of all @AppleSupport inbound</span>
              </div>
              <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Historical Escalation</span>
                <span className="text-lg font-bold text-amber-400">{selectedIntent.escalationRatePct}%</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">routed to human/DM</span>
              </div>
              <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800 col-span-2 sm:col-span-1">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Keyword Surface</span>
                <span className="text-lg font-bold text-emerald-400">{selectedIntent.keywords.length}</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">lexical anchors</span>
              </div>
            </div>

            {/* Canonical Resolution Guidelines */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
                <ArrowUpRight className="w-3.5 h-3.5 text-sky-400" />
                <span>Canonical Brand Resolution Pattern</span>
              </h4>
              <div className="bg-slate-950/60 p-3.5 rounded-lg border border-slate-800/80 text-xs text-slate-200 leading-relaxed font-sans">
                {selectedIntent.canonicalResolution}
              </div>
            </div>

            {/* Representative Benchmark Tweet */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
                <MessageCircle className="w-3.5 h-3.5 text-slate-400" />
                <span>Representative Incoming Customer Tweet</span>
              </h4>
              <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800 text-xs text-slate-300 italic">
                "{selectedIntent.sampleTweet}"
              </div>
            </div>

            {/* Key Sub-tokens and Anchors */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Extracted Lexical Anchors & Clustering N-Grams
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedIntent.keywords.map((kw, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700/60 text-xs font-mono"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
