
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import FileUpload from './components/FileUpload';
import SummaryView from './components/SummaryView';
import { extractTextFromPdf } from './services/pdfService';
import { analyzeLiterature } from './services/geminiService';
import { AppState, ProcessingStatus } from './types';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    status: ProcessingStatus.IDLE,
    result: null,
    error: null,
    fileName: null
  });

  const handleFileSelect = useCallback(async (file: File) => {
    setState({ 
      status: ProcessingStatus.READING_PDF, 
      result: null, 
      error: null, 
      fileName: file.name 
    });

    try {
      // 1. Extract Text
      const text = await extractTextFromPdf(file);
      
      // 2. Analyze with Gemini
      setState(prev => ({ ...prev, status: ProcessingStatus.ANALYZING }));
      const analysisResult = await analyzeLiterature(text);
      
      setState(prev => ({
        ...prev,
        status: ProcessingStatus.COMPLETED,
        result: analysisResult
      }));
    } catch (err: any) {
      console.error(err);
      setState(prev => ({
        ...prev,
        status: ProcessingStatus.ERROR,
        error: err.message || '处理过程中发生未知错误。'
      }));
    }
  }, []);

  const reset = () => {
    setState({
      status: ProcessingStatus.IDLE,
      result: null,
      error: null,
      fileName: null
    });
  };

  return (
    <div className="min-h-screen pb-20">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 mt-12">
        {state.status === ProcessingStatus.IDLE && (
          <div className="space-y-12 animate-in fade-in duration-500">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">
                让学术阅读更简单，让分析更专业
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                一键分析科研论文，深度解析噬菌体展示肽技术。支持公众号一键复制。
              </p>
            </div>
            <FileUpload onFileSelect={handleFileSelect} isLoading={false} />
          </div>
        )}

        {(state.status === ProcessingStatus.READING_PDF || state.status === ProcessingStatus.ANALYZING) && (
          <div className="flex flex-col items-center justify-center py-20 space-y-6">
            <div className="relative">
              <div className="w-24 h-24 border-4 border-slate-200 rounded-full"></div>
              <div className="w-24 h-24 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin absolute top-0"></div>
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-bold text-slate-800">
                {state.status === ProcessingStatus.READING_PDF ? '正在读取文献...' : 'AI 深度分析中...'}
              </h3>
              <p className="text-slate-500 animate-pulse">
                正在处理: <span className="font-medium text-slate-700">{state.fileName}</span>
              </p>
              <div className="flex gap-2 justify-center mt-4">
                 {[1,2,3].map(i => (
                    <div key={i} className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.2}s` }}></div>
                 ))}
              </div>
            </div>
          </div>
        )}

        {state.status === ProcessingStatus.ERROR && (
          <div className="max-w-md mx-auto bg-red-50 border border-red-200 rounded-2xl p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-red-800">解析失败</h3>
              <p className="text-red-600">{state.error}</p>
            </div>
            <button
              onClick={reset}
              className="px-6 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
            >
              返回重试
            </button>
          </div>
        )}

        {state.status === ProcessingStatus.COMPLETED && state.result && (
          <SummaryView result={state.result} onReset={reset} />
        )}
      </main>

      {/* Persistent CTA / Status */}
      {state.status === ProcessingStatus.COMPLETED && (
        <div className="fixed bottom-6 right-6 z-50">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-14 h-14 bg-white shadow-2xl rounded-full flex items-center justify-center text-slate-600 hover:text-indigo-600 border border-slate-100 transition-all hover:-translate-y-1"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
