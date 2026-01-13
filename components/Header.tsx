
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-6 px-4 border-b border-slate-200 bg-white/70 sticky top-0 z-50 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center shadow-xl shadow-slate-200 overflow-hidden">
            <div className="w-full h-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
               <span className="text-white font-black text-xl">R1</span>
            </div>
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              LuminaLit <span className="text-indigo-600">DeepSeek</span>
            </h1>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Phage Peptide Research Assistant</p>
          </div>
        </div>
        <div className="flex gap-4 text-xs font-bold text-slate-400 items-center">
           <span className="px-3 py-1 bg-slate-100 rounded-full">Uni-API (中科院)</span>
           <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
           <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full">DeepSeek-R1 (671B)</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
