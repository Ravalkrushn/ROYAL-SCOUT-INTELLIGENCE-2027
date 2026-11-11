'use client';

import React from 'react';
import { Filter } from 'lucide-react';

interface Option {
  label: string;
  value: string;
}

interface DropdownFilterProps {
  label?: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
}

export default function DropdownFilter({
  label,
  options,
  value,
  onChange,
}: DropdownFilterProps) {
  return (
    <div className="flex items-center gap-2">
      {label && <span className="text-xs font-medium text-gray-400">{label}:</span>}
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="appearance-none rounded-xl border border-[#1E2E4A] bg-[#0E1526] py-2 pl-3 pr-8 text-xs font-semibold text-gray-200 transition-all hover:border-[#55B7E8] focus:border-[#55B7E8] focus:outline-none"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-[#0E1526] text-white">
              {opt.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5 text-gray-400">
          <Filter className="h-3 w-3" />
        </div>
      </div>
    </div>
  );
}

