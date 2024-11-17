import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import RegisterForm from './components/RegisterForm';
import Dashboard from './components/Dashboard';

function App() {
  const [view, setView] = useState<'landing' | 'login' | 'register' | 'dashboard'>('landing');
  const [isDemo, setIsDemo] = useState(false);

  const handleGetStarted = () => {
    setView('login');
  };

  const handleLogin = () => {
    setIsDemo(false);
    setView('dashboard');
  };

  const handleDemoStart = () => {
    setIsDemo(true);
    setView('dashboard');
  };

  const handleRegister = () => {
    setView('register');
  };

  const handleRegistrationComplete = () => {
    setView('dashboard');
  };

  if (view === 'login') {
    return (
      <LoginPage
        onLogin={handleLogin}
        onDemoStart={handleDemoStart}
        onRegister={handleRegister}
      />
    );
  }

  if (view === 'register') {
    return <RegisterForm onComplete={handleRegistrationComplete} />;
  }

  if (view === 'dashboard') {
    return <Dashboard isDemo={isDemo} />;
  }

  return <LandingPage onGetStarted={handleGetStarted} onDemoStart={handleDemoStart} />;
}

export default App;