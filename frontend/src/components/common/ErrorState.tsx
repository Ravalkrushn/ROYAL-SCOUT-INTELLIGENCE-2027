import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export default function ErrorState({
  title = 'Intelligence Service Offline',
  message = 'Unable to establish live connection to the backend service. Falling back to official validated baseline data.',
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-red-900/40 bg-red-950/20 py-10 px-4 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-900/30 text-red-400 border border-red-800/50">
        <AlertCircle className="h-6 w-6" />
      </div>
      <h3 className="mt-3 text-sm font-bold text-red-200">{title}</h3>
      <p className="mt-1 text-xs text-red-300/80 max-w-md">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-red-900/40 border border-red-700/50 px-3.5 py-1.5 text-xs font-semibold text-red-200 hover:bg-red-800/60 transition-colors"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span>Retry Connection</span>
        </button>
      )}
    </div>
  );
}

