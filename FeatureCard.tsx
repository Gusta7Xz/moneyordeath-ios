
import React from 'react';

interface FeatureCardProps {
  name: string;
  desc: string;
  active: boolean;
  onToggle: () => void;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ name, desc, active, onToggle }) => {
  return (
    <div
      onClick={onToggle}
      className={`group flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all border ${
        active 
          ? 'bg-neon/10 border-neon shadow-[0_0_15px_rgba(255,45,178,0.2)]' 
          : 'bg-black/40 border-white/5 hover:border-white/10'
      }`}
    >
      <div className="flex-1 pr-4">
        <h3 className={`text-sm font-bold transition-colors ${active ? 'text-white' : 'text-white/60'}`}>
          {name}
        </h3>
        <p className={`text-[11px] leading-tight transition-colors ${active ? 'text-white/70' : 'text-white/30'}`}>
          {desc}
        </p>
      </div>

      <div className={`relative w-12 h-6 rounded-full transition-all duration-300 ${active ? 'bg-neon' : 'bg-white/10'}`}>
        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${active ? 'left-7 shadow-[0_0_10px_white]' : 'left-1'}`} />
      </div>
    </div>
  );
};
