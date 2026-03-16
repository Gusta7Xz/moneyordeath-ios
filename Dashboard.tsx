
import React, { useState, useEffect } from 'react';
import { FeatureCard } from './FeatureCard';
import { InjectionOverlay } from './InjectionOverlay';

interface Feature {
  id: string;
  name: string;
  desc: string;
  active: boolean;
}

export const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'funcoes' | 'info'>('funcoes');
  const [features, setFeatures] = useState<Feature[]>([
    { id: '1', name: 'AimBot', desc: 'Mira puxa instantaneamente na cabeça.', active: false },
    { id: '2', name: 'Regedit', desc: 'Remove 100% da tremedeira e recuo.', active: false },
    { id: '3', name: 'Precisão', desc: 'Estabiliza a mira para disparos perfeitos.', active: false },
    { id: '4', name: 'Otimização', desc: 'Redução drástica de lags e travamentos.', active: false },
  ]);
  const [injecting, setInjecting] = useState<boolean>(false);
  const [isInjected, setIsInjected] = useState<boolean>(false);
  const [currentInjection, setCurrentInjection] = useState<string>('');

  // Implementação de Wake Lock para evitar que o painel "durma" ou feche em segundo plano/suspensão de tela
  useEffect(() => {
    let wakeLock: any = null;

    const requestWakeLock = async () => {
      try {
        if ('wakeLock' in navigator) {
          wakeLock = await (navigator as any).wakeLock.request('screen');
          console.log('Wake Lock ativo: Painel persistente.');
        }
      } catch (err) {
        console.error(`${err.name}, ${err.message}`);
      }
    };

    requestWakeLock();

    // Re-solicitar wake lock se a página voltar do segundo plano
    const handleVisibilityChange = () => {
      if (wakeLock !== null && document.visibilityState === 'visible') {
        requestWakeLock();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (wakeLock) wakeLock.release();
    };
  }, []);

  const toggleFeature = (id: string) => {
    setFeatures(prev => prev.map(f => f.id === id ? { ...f, active: !f.active } : f));
  };

  const startInjection = async () => {
    const selected = features.filter(f => f.active);
    if (selected.length === 0) return;

    setInjecting(true);
    setIsInjected(false); 
    
    for (const f of selected) {
      setCurrentInjection(f.name);
      await new Promise(r => setTimeout(r, 1200));
    }
    
    setInjecting(false);
    setIsInjected(true);
    
    setTimeout(() => {
      window.location.href = "freefireth://";
    }, 800);
  };

  return (
    <div className="relative z-10 w-[360px] glass rounded-[2rem] border border-neon/40 shadow-[0_0_60px_rgba(255,45,178,0.2)] overflow-hidden">
      {/* Header */}
      <div className="p-6 pb-2 text-center border-b border-neon/10">
        <h2 className="text-white text-xl font-black tracking-tight">
          MONEY<span className="text-neon">OR</span>DEATH
        </h2>
        <div className="flex items-center justify-center gap-2 mt-1">
          <span className="text-[10px] bg-neon text-white px-2 py-0.5 rounded-full font-bold uppercase">v5.0 Stable</span>
          <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" title="Sistema Ativo"></span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex p-4 gap-3">
        <button
          onClick={() => setActiveTab('funcoes')}
          className={`flex-1 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all ${
            activeTab === 'funcoes' ? 'bg-neon text-white shadow-[0_0_15px_rgba(255,45,178,0.5)]' : 'bg-accent/50 text-white/40'
          }`}
        >
          Funções
        </button>
        <button
          onClick={() => setActiveTab('info')}
          className={`flex-1 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all ${
            activeTab === 'info' ? 'bg-neon text-white shadow-[0_0_15px_rgba(255,45,178,0.5)]' : 'bg-accent/50 text-white/40'
          }`}
        >
          Informações
        </button>
      </div>

      {/* Content */}
      <div className="px-4 pb-6 min-h-[340px]">
        {activeTab === 'funcoes' ? (
          <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
            {features.map((f) => (
              <FeatureCard
                key={f.id}
                name={f.name}
                desc={f.desc}
                active={f.active}
                onToggle={() => toggleFeature(f.id)}
              />
            ))}
            
            <button
              onClick={startInjection}
              className="w-full mt-6 py-4 bg-neon text-white font-black rounded-2xl shadow-[0_0_20px_rgba(255,45,178,0.5)] hover:shadow-[0_0_30px_rgba(255,45,178,0.7)] active:scale-[0.98] transition-all uppercase tracking-[0.2em] text-sm"
            >
              Injetar Funções
            </button>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="bg-black/40 rounded-3xl p-6 border border-neon/20 text-center space-y-4">
              <div className="w-20 h-20 bg-accent rounded-full mx-auto flex items-center justify-center border border-neon/50">
                <span className="text-neon text-3xl font-black">M</span>
              </div>
              <div className="space-y-1">
                <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest">Desenvolvido por</p>
                <p className="text-white text-xl font-bold">MoneyOrDeath</p>
              </div>
              <div className="pt-4 grid grid-cols-2 gap-2 text-[10px] uppercase font-bold tracking-widest">
                <div className="bg-accent/50 p-2 rounded-xl text-white/60">Versão: 5.0</div>
                <div className={`p-2 rounded-xl transition-all duration-500 ${
                  isInjected 
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30 animate-pulse' 
                    : 'bg-accent/50 text-white/60'
                }`}>
                  Status: {isInjected ? 'Injetado' : 'Indetectável'}
                </div>
              </div>
              <div className="bg-neon/5 p-3 rounded-2xl border border-neon/10">
                <p className="text-[9px] text-neon/80 uppercase font-black tracking-tighter">
                  Anti-Kill System: ATIVO (Painel Persistente)
                </p>
              </div>
            </div>
            {isInjected && (
              <div className="mt-4 text-center space-y-2">
                <p className="text-neon/60 text-[10px] uppercase font-bold tracking-widest animate-bounce">
                  Terminal Sincronizado!
                </p>
                <p className="text-white/40 text-[9px] uppercase">Redirecionando para o jogo...</p>
              </div>
            )}
          </div>
        )}
      </div>

      {injecting && <InjectionOverlay featureName={currentInjection} />}
    </div>
  );
};
