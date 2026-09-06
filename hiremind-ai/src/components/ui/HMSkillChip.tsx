import React from 'react';
import { Check } from 'lucide-react';

interface HMSkillChipProps {
  skill: string;
  selected?: boolean;
  onClick?: () => void;
  interactive?: boolean;
}

export function HMSkillChip({ skill, selected = false, onClick, interactive = false }: HMSkillChipProps) {
  return (
    <button
      type={interactive ? "button" : undefined}
      onClick={interactive ? onClick : undefined}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
        interactive ? 'cursor-pointer hover:-translate-y-0.5' : 'cursor-default'
      } ${
        selected
          ? 'bg-primary border-primary text-white shadow-sm'
          : 'bg-white border-border text-ink-soft hover:border-ink-faint'
      }`}
      disabled={!interactive}
    >
      <span>{skill}</span>
      {selected && <Check className="w-3 h-3 text-white" />}
    </button>
  );
}
