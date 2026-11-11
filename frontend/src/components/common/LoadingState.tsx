import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
}

export default function LoadingState({ message = 'Loading intelligence...' }: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-[#151E32] border border-[#1E2E4A] shadow-xl">
        <Loader2 className="h-7 w-7 animate-spin text-[#E83E8C]" />
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#55B7E8] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#55B7E8]"></span>
        </span>
      </div>
      <p className="mt-4 text-sm font-semibold text-gray-300">{message}</p>
      <p className="text-xs text-gray-500 mt-1">Connecting to Royal Scout Intelligence 2027 API</p>
    </div>
  );
}

