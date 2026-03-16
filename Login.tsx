
import React, { useState } from 'react';

interface LoginProps {
  onLogin: (key: string) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [key, setKey] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(key);
  };

  return (
    <div className="relative z-10 w-[340px] p-8 glass border border-neon/30 rounded-3xl shadow-[0_0_50px_rgba(255,45,178,0.3)] animate-in fade-in zoom-in duration-500">
      <div className="text-center mb-8">
        <h1 className="text-white text-3xl font-black tracking-tighter">
          MONEY<span className="text-neon">OR</span>DEATH
        </h1>
        <p className="text-neon/60 text-xs font-bold uppercase mt-1">Access Terminal v5.0</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-white/50 text-[10px] uppercase font-bold tracking-widest px-2">Key de Acesso</label>
          <input
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="••••••••"
            className="w-full bg-black/50 border border-neon/20 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-neon transition-all shadow-inner"
          />
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-neon text-white font-black rounded-xl shadow-[0_0_20px_rgba(255,45,178,0.6)] hover:shadow-[0_0_30px_rgba(255,45,178,0.8)] active:scale-95 transition-all uppercase tracking-widest text-sm"
        >
          Entrar no Sistema
        </button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-white/20 text-[9px] uppercase font-bold tracking-tighter">
          Authorized personnel only. Encrypted connection active.
        </p>
      </div>
    </div>
  );
};
