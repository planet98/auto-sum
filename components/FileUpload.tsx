
import React, { useRef, useState } from 'react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  isLoading: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, isLoading }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type === 'application/pdf') {
      onFileSelect(files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFileSelect(files[0]);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative group cursor-pointer border-2 border-dashed rounded-2xl p-12 transition-all duration-300
          ${isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-slate-300 bg-white hover:border-indigo-400 hover:bg-slate-50'}
          ${isLoading ? 'opacity-50 pointer-events-none' : ''}
        `}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".pdf"
          className="hidden"
        />
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-indigo-100 text-indigo-600 rounded-full transition-transform group-hover:scale-110">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-slate-800 mb-2">上传 PDF 文献</h3>
          <p className="text-slate-500 mb-6 max-w-sm mx-auto">
            拖拽文件到此处，或点击选择。我们将通过 AI 深度解析文献内容，并专项分析噬菌体展示技术。
          </p>
          <div className="inline-flex px-6 py-2.5 bg-indigo-600 text-white rounded-lg font-medium shadow-md shadow-indigo-100 hover:bg-indigo-700 transition-colors">
            选择文件
          </div>
        </div>
      </div>
      <p className="mt-4 text-center text-xs text-slate-400">
        支持最大 15 页的学术 PDF 文件解析
      </p>
    </div>
  );
};

export default FileUpload;
