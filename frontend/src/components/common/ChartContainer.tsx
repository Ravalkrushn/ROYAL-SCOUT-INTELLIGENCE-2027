'use client';

import React from 'react';
import { ResponsiveContainer } from 'recharts';
import { Info } from 'lucide-react';

interface ChartContainerProps {
  title: string;
  subtitle?: string;
  badge?: string;
  infoNotice?: string;
  height?: number;
  children: React.ReactNode;
}

export default function ChartContainer({
  title,
  subtitle,
  badge,
  infoNotice,
  height = 320,
  children,
}: ChartContainerProps) {
  return (
    <div className="rounded-xl border border-[#1E2E4A] bg-[#151E32]/95 p-5 shadow-xl">
      {/* Header */}
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-white">{title}</h3>
            {badge && (
              <span className="rounded bg-[#E83E8C]/15 px-2 py-0.5 text-[10px] font-bold text-[#E83E8C] border border-[#E83E8C]/30">
                {badge}
              </span>
            )}
          </div>
          {subtitle && <p className="mt-0.5 text-xs text-gray-400">{subtitle}</p>}
        </div>

        {infoNotice && (
          <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
            <Info className="h-3.5 w-3.5 text-[#55B7E8]" />
            <span className="truncate max-w-xs">{infoNotice}</span>
          </div>
        )}
      </div>

      {/* Chart Canvas */}
      <div style={{ width: '100%', height: `${height}px` }} className="pt-2">
        <ResponsiveContainer width="100%" height="100%">
          {children as React.ReactElement}
        </ResponsiveContainer>
      </div>
    </div>
  );
}

