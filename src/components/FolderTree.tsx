import React, { useState } from 'react';
import { FolderNode } from '../types';
import { FOLDER_EXPLANATIONS } from '../data/architectureData';
import { Folder, FolderOpen, FileCode, ChevronRight, ChevronDown, Info, ShieldAlert, Key, HardDrive, FileText, CheckCircle2 } from 'lucide-react';

interface FolderTreeProps {
  node: FolderNode;
}

const TreeNode: React.FC<{ node: FolderNode; depth?: number }> = ({ node, depth = 0 }) => {
  const [isOpen, setIsOpen] = useState(depth < 2);

  if (node.type === 'file') {
    return (
      <div
        className="flex items-center space-x-2 py-1.5 px-2 rounded hover:bg-slate-800/60 transition-colors font-mono text-xs text-slate-300"
        style={{ paddingLeft: `${depth * 1.25 + 0.5}rem` }}
      >
        <FileCode className="w-4 h-4 text-amber-400 shrink-0" />
        <span className="text-slate-200 font-medium">{node.name}</span>
        {node.description && (
          <span className="text-slate-400 text-[11px] font-sans ml-2 truncate border-l border-slate-700 pl-2">
            {node.description}
          </span>
        )}
      </div>
    );
  }

  return (
    <div>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 py-1.5 px-2 rounded hover:bg-slate-800 cursor-pointer transition-colors font-mono text-xs text-amber-200 font-semibold"
        style={{ paddingLeft: `${depth * 1.25 + 0.5}rem` }}
      >
        <span className="text-slate-400">
          {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
        </span>
        {isOpen ? (
          <FolderOpen className="w-4 h-4 text-amber-500 shrink-0" />
        ) : (
          <Folder className="w-4 h-4 text-amber-500 shrink-0" />
        )}
        <span>{node.name}</span>
        {node.description && (
          <span className="text-slate-400 text-[11px] font-sans font-normal ml-2 truncate border-l border-slate-700 pl-2">
            {node.description}
          </span>
        )}
      </div>
      {isOpen && node.children && (
        <div className="border-l border-slate-800 ml-3">
          {node.children.map((child, idx) => (
            <TreeNode key={idx} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export const FolderTreeInspector: React.FC<{ tree: FolderNode }> = ({ tree }) => {
  const [selectedFolderFilter, setSelectedFolderFilter] = useState<string>('all');

  const filteredExplanations = selectedFolderFilter === 'all'
    ? FOLDER_EXPLANATIONS
    : FOLDER_EXPLANATIONS.filter(f => f.name.toLowerCase().includes(selectedFolderFilter.toLowerCase()));

  return (
    <div className="space-y-8">
      {/* Visual Tree Explorer */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl text-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-800 gap-3">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center space-x-2">
              <Folder className="w-5 h-5 text-amber-500" />
              <span>BALAJI Core PHP Production Folder Tree</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Hostinger Shared Hosting Compatible Structure (Zero Framework Overhead)
            </p>
          </div>
          <div className="flex items-center space-x-2 text-xs bg-amber-500/10 border border-amber-500/20 text-amber-300 px-3 py-1.5 rounded-lg shrink-0">
            <Info className="w-4 h-4 text-amber-400" />
            <span>Non-Framework MVC Architecture</span>
          </div>
        </div>

        <div className="bg-slate-950 rounded-lg p-4 border border-slate-800/80 max-h-[550px] overflow-y-auto">
          <TreeNode node={tree} />
        </div>
      </div>

      {/* Directory Purpose & Explanation Matrix */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-amber-400 uppercase tracking-wider mb-1">
              <HardDrive className="w-4 h-4" />
              <span>Hostinger Directory Rationale & Security Specification</span>
            </div>
            <h3 className="text-xl font-bold text-white">
              Why Each Folder Exists & Production Purpose
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Every folder in the BALAJI project is created with a strict functional purpose to prevent unnecessary clutter.
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs">
            <span className="text-slate-400">Filter Folder:</span>
            <select
              value={selectedFolderFilter}
              onChange={(e) => setSelectedFolderFilter(e.target.value)}
              className="bg-slate-950 border border-slate-700 text-slate-200 rounded px-2.5 py-1 text-xs focus:outline-none focus:border-amber-500"
            >
              <option value="all">All Folders ({FOLDER_EXPLANATIONS.length})</option>
              <option value="config">config/</option>
              <option value="database">database/</option>
              <option value="classes">classes/</option>
              <option value="functions">functions/</option>
              <option value="includes">includes/</option>
              <option value="pages">pages/</option>
              <option value="api">api/</option>
              <option value="ajax">ajax/</option>
              <option value="admin">admin/</option>
              <option value="assets">assets/</option>
              <option value="uploads">uploads/</option>
              <option value="logs">logs/</option>
              <option value="vendor">vendor/</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredExplanations.map((folder, idx) => (
            <div
              key={idx}
              className="bg-slate-950 border border-slate-800/90 rounded-xl p-4 hover:border-amber-500/40 transition-all space-y-3 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5 mb-2.5">
                  <div className="flex items-center space-x-2">
                    <Folder className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="font-mono text-sm font-bold text-amber-300">{folder.path}</span>
                  </div>
                  <span className="text-[10px] font-mono bg-slate-900 border border-slate-800 text-slate-400 px-2 py-0.5 rounded">
                    {folder.permissions}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  <strong className="text-slate-100 font-semibold">Purpose: </strong>
                  {folder.purpose}
                </p>

                <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/70 text-xs space-y-1.5 mb-3">
                  <div className="flex items-start space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <p className="text-slate-300 text-[11px]">
                      <strong className="text-emerald-400">Why Required: </strong>
                      {folder.whyRequired}
                    </p>
                  </div>

                  {folder.securityNote && (
                    <div className="flex items-start space-x-1.5 border-t border-slate-800/80 pt-1.5 mt-1.5">
                      <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <p className="text-amber-200/90 text-[11px]">
                        <strong>Security Rule: </strong>
                        {folder.securityNote}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-slate-400 block mb-1.5 flex items-center space-x-1">
                  <FileText className="w-3 h-3 text-slate-400" />
                  <span>Key Included Files:</span>
                </span>
                <div className="flex flex-wrap gap-1">
                  {folder.keyFiles.map((file, fIdx) => (
                    <span
                      key={fIdx}
                      className="text-[10px] font-mono bg-slate-900 border border-slate-800 text-slate-300 px-2 py-0.5 rounded"
                    >
                      {file}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

