import React from 'react';
import { LucideIcon } from 'lucide-react';

interface KpiCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  badge?: string;
  badgeType?: 'pink' | 'blue' | 'amber' | 'emerald';
  icon?: LucideIcon;
  trend?: {
    label: string;
    isPositive?: boolean;
  };
}

export default function KpiCard({
  title,
  value,
  subtitle,
  badge,
  badgeType = 'blue',
  icon: Icon,
  trend,
}: KpiCardProps) {
  const badgeStyles = {
    pink: 'bg-[#E83E8C]/15 text-[#E83E8C] border-[#E83E8C]/30',
    blue: 'bg-[#55B7E8]/15 text-[#55B7E8] border-[#55B7E8]/30',
    amber: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    emerald: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  };

  return (
    <div className="relative overflow-hidden rounded-xl border border-[#1E2E4A] bg-[#151E32]/90 p-5 shadow-lg backdrop-blur-sm transition-all duration-200 hover:border-[#55B7E8]/40 hover:shadow-xl">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-gray-400">{title}</p>
          <div className="mt-2 flex items-baseline gap-2">
            <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">{value}</h3>
            {badge && (
              <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-semibold ${badgeStyles[badgeType]}`}>
                {badge}
              </span>
            )}
          </div>
          {subtitle && <p className="mt-1 text-xs text-gray-400">{subtitle}</p>}
          {trend && (
            <p className={`mt-2 text-xs font-medium ${trend.isPositive ? 'text-emerald-400' : 'text-amber-400'}`}>
              {trend.label}
            </p>
          )}
        </div>
        {Icon && (
          <div className="rounded-lg bg-[#0F172A] p-2.5 text-[#55B7E8] border border-[#1E2E4A]/80 shadow-inner">
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>

      {/* Decorative gradient corner */}
      <div className="pointer-events-none absolute -right-6 -bottom-6 h-20 w-20 rounded-full bg-gradient-to-tr from-[#E83E8C]/10 to-[#55B7E8]/10 blur-xl"></div>
    </div>
  );
}

