import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  actions?: React.ReactNode;
}

export default function SectionHeader({
  title,
  subtitle,
  badge,
  actions,
}: SectionHeaderProps) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-6">
      <div>
        <div className="flex items-center gap-2.5">
          <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">{title}</h2>
          {badge && (
            <span className="rounded-md bg-[#E83E8C]/15 px-2.5 py-0.5 text-xs font-bold text-[#E83E8C] border border-[#E83E8C]/30">
              {badge}
            </span>
          )}
        </div>
        {subtitle && <p className="mt-1 text-xs text-gray-400 max-w-2xl">{subtitle}</p>}
      </div>

      {actions && <div className="flex items-center gap-2.5">{actions}</div>}
    </div>
  );
}

