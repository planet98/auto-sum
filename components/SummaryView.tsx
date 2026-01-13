
import React from 'react';
import { SummaryResult } from '../types';

interface SummaryViewProps {
  result: SummaryResult;
  onReset: () => void;
}

const SummaryView: React.FC<SummaryViewProps> = ({ result, onReset }) => {
  const copyToClipboard = () => {
    const text = `
【文献深度总结】
${result.overallSummary}

【核心发现】
${result.keyFindings.map(f => `• ${f}`).join('\n')}

【研究方法】
${result.methodology}

【噬菌体展示肽技术专项分析】
${result.phageDisplaySection}

【结论与展望】
${result.conclusions}
    `.trim();
    navigator.clipboard.writeText(text);
    alert('已复制到剪贴板，可直接粘贴至公众号后台！');
  };

  return (
    <div className="w-full max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={onReset}
          className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors font-medium"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          重新上传
        </button>
        <button
          onClick={copyToClipboard}
          className="px-6 py-2.5 bg-green-600 text-white rounded-xl font-semibold shadow-lg shadow-green-100 hover:bg-green-700 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
          </svg>
          复制到公众号
        </button>
      </div>

      <div className="space-y-8">
        {/* Overall Summary */}
        <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-slate-800">文献综述</h2>
          </div>
          <p className="text-slate-600 leading-relaxed text-lg">{result.overallSummary}</p>
        </section>

        {/* Key Findings & Methodology */}
        <div className="grid md:grid-cols-2 gap-8">
          <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
              核心发现
            </h3>
            <ul className="space-y-3">
              {result.keyFindings.map((finding, idx) => (
                <li key={idx} className="flex gap-3 text-slate-600">
                  <span className="text-indigo-400 font-bold shrink-0">{idx + 1}.</span>
                  {finding}
                </li>
              ))}
            </ul>
          </section>
          <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-violet-500 rounded-full"></span>
              研究方法
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">{result.methodology}</p>
          </section>
        </div>

        {/* SPECIAL SECTION: Phage Display */}
        <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-10 text-white shadow-xl shadow-indigo-200">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <svg className="w-48 h-48" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29L12 2Z" />
            </svg>
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-white/20 backdrop-blur rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold">噬菌体展示肽技术专项分析</h2>
            </div>
            <div className="prose-custom text-indigo-50 leading-loose text-lg whitespace-pre-wrap">
              {result.phageDisplaySection}
            </div>
          </div>
        </section>

        {/* Conclusions */}
        <section className="bg-slate-800 rounded-3xl p-8 text-white">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1a1 1 0 112 0v1a1 1 0 11-2 0zM13.243 15.657a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM16 10a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1z" />
            </svg>
            结论与展望
          </h3>
          <p className="text-slate-300 leading-relaxed italic">
            "{result.conclusions}"
          </p>
        </section>
      </div>
    </div>
  );
};

export default SummaryView;
