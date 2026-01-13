
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import FileUpload from './components/FileUpload';
import SummaryView from './components/SummaryView';
import { extractTextFromPdf } from './services/pdfService';
import { analyzeLiterature } from './services/aiService';
import { AppState, ProcessingStatus } from './types';

interface ExtendedAppState extends AppState {
  reasoning?: string;
}

const App: React.FC = () => {
  const [state, setState] = useState<ExtendedAppState>({
    status: ProcessingStatus.IDLE,
    result: null,
    error: null,
    fileName: null,
    reasoning: undefined
  });

  const handleFileSelect = useCallback(async (file: File) => {
    setState({ 
      status: ProcessingStatus.READING_PDF, 
      result: null, 
      error: null, 
      fileName: file.name,
      reasoning: undefined
    });

    try {
      const text = await extractTextFromPdf(file);
      
      setState(prev => ({ ...prev, status: ProcessingStatus.ANALYZING }));
      const analysisResult = await analyzeLiterature(text);
      
      setState(prev => ({
        ...prev,
        status: ProcessingStatus.COMPLETED,
        result: analysisResult,
        reasoning: (analysisResult as any).reasoning
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
      fileName: null,
      reasoning: undefined
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
                DeepSeek-R1 学术助手
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                使用中科院 Uni-API 深度解析科研论文，专项优化噬菌体展示肽技术。
              </p>
            </div>
            <FileUpload onFileSelect={handleFileSelect} isLoading={false} />
          </div>
        )}

        {(state.status === ProcessingStatus.READING_PDF || state.status === ProcessingStatus.ANALYZING) && (
          <div className="flex flex-col items-center justify-center py-20 space-y-6">
            <div className="relative">
              <div className="w-24 h-24 border-4 border-slate-200 rounded-full"></div>
              <div className="w-24 h-24 border-4 border-slate-900 rounded-full border-t-transparent animate-spin absolute top-0"></div>
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-bold text-slate-800">
                {state.status === ProcessingStatus.READING_PDF ? '正在读取 PDF...' : 'DeepSeek-R1 正在深度思考...'}
              </h3>
              <p className="text-slate-500 animate-pulse">
                正在解析: <span className="font-medium text-slate-700">{state.fileName}</span>
              </p>
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
              <h3 className="text-xl font-bold text-red-800">请求失败</h3>
              <p className="text-red-600 text-sm">{state.error}</p>
            </div>
            <button onClick={reset} className="px-6 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800">
              返回重试
            </button>
          </div>
        )}

        {state.status === ProcessingStatus.COMPLETED && state.result && (
          <div className="space-y-6">
            {state.reasoning && (
              <details className="bg-white/60 border border-slate-200 rounded-3xl p-6 shadow-sm group transition-all">
                <summary className="text-sm font-bold text-slate-400 cursor-pointer list-none flex items-center gap-2 select-none">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
                  查看 DeepSeek-R1 的思考链路 (Chain of Thought)
                </summary>
                <div className="mt-4 text-xs text-slate-400 font-mono whitespace-pre-wrap leading-relaxed border-t border-slate-100 pt-4">
                  {state.reasoning}
                </div>
              </details>
            )}
            <SummaryView result={state.result} onReset={reset} />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
