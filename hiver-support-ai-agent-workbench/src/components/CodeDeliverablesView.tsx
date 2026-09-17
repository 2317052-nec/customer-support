import React, { useState } from 'react';
import { PYTHON_DELIVERABLES, PythonFileItem } from '../data/pythonDeliverables';
import { FileCode, Copy, Check, Download, Terminal, FolderGit2 } from 'lucide-react';

export const CodeDeliverablesView: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<PythonFileItem>(PYTHON_DELIVERABLES[0]);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([selectedFile.code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = selectedFile.filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20">
                Prompts 1–5 Python Deliverables
              </span>
              <h2 className="text-lg font-bold text-white">Production Modular Python Codebase</h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
              Complete, runnable Python scripts matching each prompt requirement using <code className="text-sky-300 font-mono text-xs">pandas</code>, <code className="text-sky-300 font-mono text-xs">scikit-learn</code>, and <code className="text-sky-300 font-mono text-xs">pydantic</code>.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleDownload}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-medium cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download {selectedFile.filename}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Code Viewer Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left File Selector List */}
        <div className="lg:col-span-4 space-y-2">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block px-1">
            Deliverable Scripts
          </span>
          <div className="space-y-1.5">
            {PYTHON_DELIVERABLES.map((file) => {
              const isSelected = selectedFile.filename === file.filename;
              return (
                <button
                  key={file.filename}
                  id={`file-btn-${file.filename.replace('.', '_')}`}
                  onClick={() => setSelectedFile(file)}
                  className={`w-full text-left p-3 rounded-xl border text-xs transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-800 border-sky-500 text-white shadow-sm'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-sky-400">{file.filename}</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {file.promptNumber > 0 ? `Prompt ${file.promptNumber}` : 'Config'}
                    </span>
                  </div>
                  <div className="text-xs text-slate-200 font-medium mt-1 truncate">
                    {file.title}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                    {file.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Code Content Pane */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm flex flex-col">
          {/* File Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-slate-950/80 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <FileCode className="w-4 h-4 text-sky-400" />
              <span className="font-mono font-bold text-xs text-white">{selectedFile.filename}</span>
              <span className="text-xs text-slate-400 hidden sm:inline">• {selectedFile.title}</span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleCopy}
                className="flex items-center space-x-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 transition-all cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Code'}</span>
              </button>
            </div>
          </div>

          {/* Code Window */}
          <div className="p-4 overflow-x-auto max-h-[600px] overflow-y-auto bg-slate-950 font-mono text-xs text-slate-200 leading-relaxed">
            <pre className="whitespace-pre">
              <code>{selectedFile.code}</code>
            </pre>
          </div>

          <div className="px-4 py-2 bg-slate-950/90 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Syntax: Python 3.10+ / Pydantic v2 / Scikit-learn</span>
            <span>Lines: {selectedFile.code.split('\n').length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
