import React from 'react';
import { SECURITY_MEASURES } from '../data/architectureData';
import { ShieldAlert, CheckCircle2, Code } from 'lucide-react';

export const SecurityChecklist: React.FC = () => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl text-slate-200 space-y-6">
      <div className="pb-4 border-b border-slate-800">
        <h2 className="text-lg font-bold text-white flex items-center space-x-2">
          <ShieldAlert className="w-5 h-5 text-amber-500" />
          <span>BALAJI Core PHP Security Architecture</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Defensive coding practices for Core PHP applications hosted on shared server environments
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {SECURITY_MEASURES.map((sec, idx) => (
          <div key={idx} className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <h3 className="text-sm font-bold text-white">{sec.threat}</h3>
              </div>
              <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${
                sec.status === 'Critical'
                  ? 'bg-red-500/10 text-red-400 border-red-500/20'
                  : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
              }`}>
                {sec.status} Priority
              </span>
            </div>

            <p className="text-xs text-slate-300">{sec.mitigation}</p>

            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 font-mono text-xs text-amber-300 overflow-x-auto">
              <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1 font-sans">
                <span className="flex items-center space-x-1">
                  <Code className="w-3 h-3 text-slate-400" />
                  <span>Implementation Pattern</span>
                </span>
              </div>
              <pre>{sec.codeSnippet}</pre>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
