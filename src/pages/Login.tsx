import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Lock, Mail, AlertTriangle } from 'lucide-react';
import ActionButton from '../components/buttons/ActionButton';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  
  const navigate = useNavigate();
  const { login, isAuthenticated, isLoading, error, clearError } = useAuthStore();
  
  // Navigate to home if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);
  
  // Clear errors on unmount
  useEffect(() => {
    return () => {
      clearError();
    };
  }, [clearError]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email.trim() && password.trim()) {
      await login(email, password);
    }
  };
  
  // For demo, simplified login
  const handleQuickLogin = async () => {
    await login('stella@example.com', 'password');
  };
  
  return (
    <div className="min-h-screen bg-primary flex flex-col justify-center">
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">Welcome Back</h1>
            <p className="text-gray-400">Log in to your Elite Connect account</p>
          </div>
          
          {error && (
            <div className="bg-error-dark/20 border border-error text-white p-4 rounded-lg mb-6 flex items-center">
              <AlertTriangle size={20} className="text-error mr-2 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}
          
          <div className="card p-6 mb-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={18} className="text-gray-500" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    className="input pl-10 w-full"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="password" className="block text-sm font-medium">
                    Password
                  </label>
                  <a href="#" className="text-sm text-accent-gold hover:underline">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={18} className="text-gray-500" />
                  </div>
                  <input
                    type="password"
                    id="password"
                    className="input pl-10 w-full"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="flex items-center mb-6">
                <input
                  type="checkbox"
                  id="remember-me"
                  className="rounded border-gray-600 text-accent-gold focus:ring-accent-gold"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm">
                  Remember me
                </label>
              </div>
              
              <ActionButton
                onClick={() => {}}
                variant="primary"
                isLoading={isLoading}
                className="w-full"
                type="submit"
              >
                Sign In
              </ActionButton>
            </form>
            
            <div className="text-center mt-6">
              <button
                onClick={handleQuickLogin}
                className="text-accent-gold hover:underline text-sm"
              >
                Demo Login (Skip Form)
              </button>
            </div>
          </div>
          
          <p className="text-center text-gray-400 text-sm">
            Don't have an account?{' '}
            <Link to="/register" className="text-accent-gold hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;