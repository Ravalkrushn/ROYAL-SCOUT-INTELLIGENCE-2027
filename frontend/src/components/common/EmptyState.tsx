import React from 'react';
import { Database, Search } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  onReset?: () => void;
  actionText?: string;
}

export default function EmptyState({
  title = 'No records found',
  description = 'No player matches the selected criteria. Try adjusting your query or filters.',
  onReset,
  actionText = 'Reset Filters',
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-[#1E2E4A] bg-[#151E32]/50 py-16 px-4 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0E1526] text-gray-400 border border-[#1E2E4A]">
        <Search className="h-6 w-6 text-[#55B7E8]" />
      </div>
      <h3 className="mt-4 text-base font-bold text-white">{title}</h3>
      <p className="mt-1 text-xs text-gray-400 max-w-sm">{description}</p>
      {onReset && (
        <button
          onClick={onReset}
          className="mt-4 rounded-lg bg-[#E83E8C]/15 border border-[#E83E8C]/40 px-4 py-2 text-xs font-bold text-[#E83E8C] hover:bg-[#E83E8C] hover:text-white transition-colors"
        >
          {actionText}
        </button>
      )}
    </div>
  );
}

