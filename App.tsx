
import React, { useState, useEffect } from 'react';
import { Background } from './components/Background';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [showApp, setShowApp] = useState<boolean>(false);

  // Simple transition effect after login
  useEffect(() => {
    if (isAuthenticated) {
      const timer = setTimeout(() => setShowApp(true), 500);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated]);

  const handleLogin = (key: string) => {
    if (key === 'money01') {
      setIsAuthenticated(true);
    } else {
      alert('Chave Inválida!');
    }
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      <Background />
      
      {!isAuthenticated ? (
        <Login onLogin={handleLogin} />
      ) : (
        <div className={`transition-opacity duration-700 ${showApp ? 'opacity-100' : 'opacity-0'}`}>
          <Dashboard />
        </div>
      )}
    </div>
  );
};

export default App;
