
import React from 'react';
import { SummaryResult } from '../types';

interface SummaryViewProps {
  result: SummaryResult;
  onReset: () => void;
}

const SummaryView: React.FC<SummaryViewProps> = ({ result, onReset }) => {
  const copyToClipboard = () => {
    const text = `
🌟 【LuminaLit 文献深度速读】

📄 全文摘要：
${result.overallSummary}

💡 核心发现：
${result.keyFindings.map((f, i) => `${i + 1}. ${f}`).join('\n')}

🔬 实验方法：
${result.methodology}

🧬 【噬菌体展示肽技术专题】
${result.phageDisplaySection}

📝 结论与启示：
${result.conclusions}

---
由 LuminaLit AI 驱动 · 助力生命科学研究
    `.trim();
    navigator.clipboard.writeText(text);
    alert('✨ 格式化内容已复制！直接粘贴至公众号后台即可。');
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-10 py-10 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-6 rounded-3xl shadow-sm border border-slate-100 sticky top-24 z-40 backdrop-blur-md bg-white/90">
        <div>
          <h2 className="text-xl font-bold text-slate-800">解析报告已就绪</h2>
          <p className="text-sm text-slate-500">已针对噬菌体展示技术进行专项优化</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onReset}
            className="px-5 py-2.5 text-slate-600 hover:bg-slate-50 rounded-xl transition-colors font-medium border border-slate-200"
          >
            解析下一篇
          </button>
          <button
            onClick={copyToClipboard}
            className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
            复制公众号正文
          </button>
        </div>
      </div>

      <div className="grid gap-8">
        {/* Abstract */}
        <section className="bg-white rounded-[2rem] p-10 shadow-sm border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-indigo-500"></div>
          <h3 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-3">
            <span className="text-indigo-600">01</span> 文献速览
          </h3>
          <p className="text-slate-600 leading-relaxed text-lg">{result.overallSummary}</p>
        </section>

        {/* Findings & Methods */}
        <div className="grid md:grid-cols-2 gap-8">
          <section className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-sm">💡</span>
              核心要点
            </h3>
            <ul className="space-y-4">
              {result.keyFindings.map((finding, idx) => (
                <li key={idx} className="flex gap-4 group">
                  <span className="text-indigo-300 font-mono font-bold group-hover:text-indigo-600 transition-colors">{String(idx + 1).padStart(2, '0')}</span>
                  <p className="text-slate-600 text-sm leading-relaxed">{finding}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm">🔬</span>
              技术路线
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">{result.methodology}</p>
          </section>
        </div>

        {/* PHAGE DISPLAY - SPECIAL SECTION */}
        <section className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-violet-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative bg-white rounded-[2rem] p-10 shadow-xl border border-indigo-50">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-700">
                  噬菌体展示肽技术专项分析
                </h2>
                <p className="text-slate-400 text-sm font-medium tracking-widest uppercase">Special Report on Phage Display</p>
              </div>
            </div>
            <div className="prose-custom text-slate-700 leading-loose text-lg whitespace-pre-wrap bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
              {result.phageDisplaySection}
            </div>
          </div>
        </section>

        {/* Conclusion */}
        <section className="bg-slate-900 rounded-[2rem] p-10 text-white relative overflow-hidden">
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mb-32 -mr-32"></div>
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <svg className="w-6 h-6 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            总结与未来视角
          </h3>
          <p className="text-slate-400 leading-relaxed italic text-lg">
            “{result.conclusions}”
          </p>
        </section>
      </div>
    </div>
  );
};

export default SummaryView;
