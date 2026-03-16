
import React from 'react';

interface InjectionOverlayProps {
  featureName: string;
}

export const InjectionOverlay: React.FC<InjectionOverlayProps> = ({ featureName }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="w-[220px] p-8 rounded-3xl bg-black border border-neon shadow-[0_0_40px_rgba(255,45,178,0.6)] animate-pulse-glow text-center space-y-6">
        <div className="flex justify-center">
          <div className="w-12 h-12 border-4 border-neon border-t-transparent rounded-full animate-spin"></div>
        </div>
        
        <div className="space-y-1">
          <p className="text-neon text-[10px] font-black uppercase tracking-widest">Injetando</p>
          <p className="text-white text-lg font-bold tracking-tight">{featureName}</p>
        </div>

        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-neon animate-[progress_1.2s_ease-in-out_infinite]" style={{ width: '100%' }}></div>
        </div>
      </div>
      <style>{`
        @keyframes progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};
