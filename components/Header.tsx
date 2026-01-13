
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-8 px-4 border-b border-slate-200 bg-white/50 sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-violet-700">
              LuminaLit AI
            </h1>
            <p className="text-sm text-slate-500 font-medium">文献智能阅读 & 噬菌体技术分析专家</p>
          </div>
        </div>
        <div className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
          <a href="#" className="hover:text-indigo-600 transition-colors">文献总结</a>
          <a href="#" className="hover:text-indigo-600 transition-colors">噬菌体专题</a>
          <a href="#" className="hover:text-indigo-600 transition-colors">技术文档</a>
        </div>
      </div>
    </header>
  );
};

export default Header;
