'use client';

import React, { useState } from 'react';
import { UploadCloud, CheckCircle2, Loader2 } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { candidatesService } from '@/services/candidates.service';

interface ResumeUploaderProps {
  jobId?: string;
  onScreeningComplete?: () => void;
}

export const ResumeUploader: React.FC<ResumeUploaderProps> = ({ jobId, onScreeningComplete }) => {
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'screening' | 'success'>('idle');
  const [progress, setProgress] = useState(0);

  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (uploadedFile: File) => {
    setFile(uploadedFile);
    setStatus('uploading');
    setProgress(30);
    setError(null);

    try {
      // 1. Read file as Base64
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          const base64Data = reader.result as string;
          // Clean base64 string (remove data:application/pdf;base64, prefix if present)
          const fileBase64 = base64Data.split(',')[1] || base64Data;
          const mimeType = uploadedFile.type || 'application/pdf';

          setProgress(60);
          setStatus('screening');

          // 2. Call backend
          await candidatesService.uploadAndScreenResume(
            uploadedFile.name,
            fileBase64,
            mimeType,
            jobId || 'default-job-id'
          );

          setProgress(100);
          setStatus('success');
          if (onScreeningComplete) {
            onScreeningComplete();
          }
        } catch (err) {
          console.error('Upload failed:', err);
          setError('Failed to process the resume. Please try again.');
          setStatus('idle');
        }
      };
      reader.onerror = () => {
        setError('Failed to read the file.');
        setStatus('idle');
      };

      reader.readAsDataURL(uploadedFile);
    } catch (err) {
      console.error(err);
      setError('An unexpected error occurred.');
      setStatus('idle');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleUpload(e.target.files[0]);
    }
  };

  return (
    <Card className="w-full">
      <h3 className="text-lg font-semibold text-ink mb-1">Upload Resume</h3>
      <p className="text-sm text-ink-soft mb-6">Accepts PDF, DOC, DOCX files for autonomous AI extraction.</p>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`border border-dashed rounded-[var(--radius-md)] p-10 flex flex-col items-center justify-center text-center transition-all ${
          dragOver ? 'border-primary bg-primary-tint/30' : 'border-border bg-surface-sunken/30'
        }`}
      >
        {status === 'idle' && (
          <>
            {error && (
              <div className="w-full p-3 mb-4 text-xs font-semibold text-danger bg-danger-tint border border-danger rounded-[var(--radius-md)] text-left">
                {error}
              </div>
            )}
            <div className="w-14 h-14 bg-primary-tint rounded-full flex items-center justify-center text-primary mb-4 shadow-sm">
              <UploadCloud className="w-7 h-7" />
            </div>
            <p className="text-base font-semibold text-ink">Drag & drop candidate resume here</p>
            <p className="text-sm text-ink-soft mt-1 mb-6">Or browse files from your computer</p>
            <label className="px-5 py-2.5 bg-primary hover:bg-blue-700 text-white text-sm font-semibold rounded-[var(--radius-sm)] cursor-pointer transition-colors shadow-sm inline-flex items-center">
              Select Resume File
              <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileSelect} className="hidden" />
            </label>
          </>
        )}

        {(status === 'uploading' || status === 'screening') && (
          <div className="w-full max-w-sm flex flex-col items-center">
            <Loader2 className="w-8 h-8 text-primary animate-spin mb-4" />
            <span className="text-sm font-semibold text-ink">
              {status === 'uploading' ? 'Uploading Resume File...' : 'AI Screening & Extracting Skills...'}
            </span>
            <div className="w-full bg-border h-2 rounded-full mt-4 overflow-hidden">
              <div
                className="bg-primary h-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-xs text-ink-soft mt-3 font-medium">{file?.name}</span>
          </div>
        )}

        {status === 'success' && (
          <div className="flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-300">
            <div className="w-14 h-14 bg-success-tint rounded-full flex items-center justify-center text-success mb-4 shadow-sm">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h4 className="text-base font-semibold text-ink">Resume Processed & Screened!</h4>
            <p className="text-sm text-ink-soft mt-1 mb-6 max-w-sm">
              AI has calculated match score and initialized skill verification workflows.
            </p>
            <button
              onClick={() => {
                setStatus('idle');
                setFile(null);
                setProgress(0);
              }}
              className="text-sm font-semibold text-primary hover:underline"
            >
              Upload another resume
            </button>
          </div>
        )}
      </div>
    </Card>
  );
};
