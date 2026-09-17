import React from 'react';
import { Bot, ShieldCheck, Sparkles, Database, FileCode, CheckCircle2 } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  geminiStatus: boolean;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, geminiStatus }) => {
  const tabs = [
    { id: 'playground', label: '3-Stage Agent', icon: Bot, badge: 'Live' },
    { id: 'taxonomy', label: 'Intent Taxonomy', icon: Database, badge: 'P1' },
    { id: 'golden', label: 'Golden Set (175)', icon: ShieldCheck, badge: 'P3' },
    { id: 'evaluation', label: 'Evaluation & Baselines', icon: Sparkles, badge: 'P4/P5' },
    { id: 'report', label: 'Report & Decision Log', icon: CheckCircle2, badge: 'P5' },
    { id: 'code', label: 'Python Deliverables', icon: FileCode, badge: 'Code' },
  ];

  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand and Title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-sky-500/20">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-base sm:text-lg font-bold tracking-tight text-white">
                  Hiver Support AI Agent
                </h1>
                <span className="text-xs px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 font-medium border border-sky-500/30">
                  @AppleSupport
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                3-Stage Architecture • Golden Set (175) • LLM-as-a-Judge • Kaggle TWCS
              </p>
            </div>
          </div>

          {/* Engine Status */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 text-xs">
              <span className={`w-2 h-2 rounded-full ${geminiStatus ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
              <span className="text-slate-300 font-medium hidden md:inline">
                {geminiStatus ? 'Gemini 3.8 Flash Active' : 'Deterministic RAG Engine'}
              </span>
              <span className="text-slate-400 text-[10px] hidden lg:inline">
                (93.7% Accuracy)
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Bar */}
        <div className="flex space-x-1 overflow-x-auto scrollbar-none border-t border-slate-800/80 py-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-btn-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-sky-500 text-white shadow-sm shadow-sky-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${
                    isActive ? 'bg-sky-700/60 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
