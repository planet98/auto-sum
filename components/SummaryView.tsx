
import React from 'react';
import { SummaryResult } from '../types';

interface SummaryViewProps {
  result: SummaryResult;
  onReset: () => void;
}

const SummaryView: React.FC<SummaryViewProps> = ({ result, onReset }) => {
  const copyToClipboard = () => {
    const text = `
━━━━━━━━━━━━━━
🌟 【LuminaLit 文献深度速读】
━━━━━━━━━━━━━━

📄 【全文摘要】
${result.overallSummary}

💡 【核心发现】
${result.keyFindings.map((f, i) => `🔹 ${f}`).join('\n')}

🔬 【实验方法与技术】
${result.methodology}

🧬 【噬菌体展示肽技术专项分析】
————————————————
${result.phageDisplaySection}
————————————————

📝 【结论与未来启示】
“${result.conclusions}”

✨ 感谢阅读！本文由 DeepSeek-R1 (671B) 驱动的 LuminaLit AI 自动生成，助力您的生命科学科研之路。
    `.trim();
    
    navigator.clipboard.writeText(text);
    alert('✨ 适配公众号的格式已复制！\n\n提示：直接粘贴到微信公众号后台编辑器，排版效果最佳。');
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-10 py-10 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white/90 p-6 rounded-3xl shadow-xl border border-slate-100 sticky top-24 z-40 backdrop-blur-md">
        <div>
          <h2 className="text-xl font-bold text-slate-800">深度分析已完成</h2>
          <p className="text-sm text-slate-500 font-medium">DeepSeek-R1 (671B) 已生成专业学术报告</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onReset}
            className="px-5 py-2.5 text-slate-600 hover:bg-slate-50 rounded-xl transition-all font-semibold border border-slate-200"
          >
            解析新文献
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
        <section className="bg-white rounded-[2rem] p-10 shadow-sm border border-slate-100 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-2 h-full bg-indigo-500 transition-all group-hover:w-3"></div>
          <h3 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-3">
            <span className="text-indigo-600">01</span> 文献概览
          </h3>
          <p className="text-slate-600 leading-relaxed text-lg">{result.overallSummary}</p>
        </section>

        <div className="grid md:grid-cols-2 gap-8">
          <section className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <span className="w-10 h-10 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center">💡</span>
              关键发现
            </h3>
            <ul className="space-y-4">
              {result.keyFindings.map((finding, idx) => (
                <li key={idx} className="flex gap-4 group">
                  <span className="text-indigo-400 font-mono font-bold">{idx + 1}.</span>
                  <p className="text-slate-600 text-sm leading-relaxed">{finding}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">🔬</span>
              实验技术
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">{result.methodology}</p>
          </section>
        </div>

        <section className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-violet-600 rounded-[2.5rem] blur opacity-10"></div>
          <div className="relative bg-white rounded-[2rem] p-10 shadow-xl border border-indigo-50 overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5 text-indigo-100">
               🧬
            </div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl">
                🧪
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-800">
                  噬菌体展示肽技术分析
                </h2>
                <p className="text-indigo-500 text-xs font-bold uppercase tracking-widest mt-1">Specialized Insight</p>
              </div>
            </div>
            <div className="prose-custom text-slate-700 leading-relaxed text-lg whitespace-pre-wrap bg-indigo-50/30 p-8 rounded-2xl border border-indigo-100/50">
              {result.phageDisplaySection}
            </div>
          </div>
        </section>

        <section className="bg-slate-900 rounded-[2rem] p-10 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl"></div>
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-indigo-400">
            📊 研究启示
          </h3>
          <p className="text-slate-300 leading-relaxed italic text-lg font-medium">
            “{result.conclusions}”
          </p>
        </section>
      </div>
    </div>
  );
};

export default SummaryView;
