import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Lock, Mail, User, AlertTriangle } from 'lucide-react';
import ActionButton from '../components/buttons/ActionButton';

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [ageVerified, setAgeVerified] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const { register, isAuthenticated, isLoading, error, clearError } = useAuthStore();
  
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
    setValidationError(null);
    
    // Validate
    if (password !== confirmPassword) {
      setValidationError("Passwords don't match");
      return;
    }
    
    if (password.length < 8) {
      setValidationError("Password must be at least 8 characters");
      return;
    }
    
    if (!agreeTerms || !ageVerified) {
      setValidationError("You must agree to the terms and verify your age");
      return;
    }
    
    // All good, try to register
    await register(email, password, username);
  };
  
  return (
    <div className="min-h-screen bg-primary flex flex-col justify-center">
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">Create Account</h1>
            <p className="text-gray-400">Join our exclusive community today</p>
          </div>
          
          {(error || validationError) && (
            <div className="bg-error-dark/20 border border-error text-white p-4 rounded-lg mb-6 flex items-center">
              <AlertTriangle size={20} className="text-error mr-2 flex-shrink-0" />
              <p>{validationError || error}</p>
            </div>
          )}
          
          <div className="card p-6 mb-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="username" className="block text-sm font-medium mb-2">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User size={18} className="text-gray-500" />
                  </div>
                  <input
                    type="text"
                    id="username"
                    className="input pl-10 w-full"
                    placeholder="Choose a username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              </div>
              
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
              
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium mb-2">
                  Password
                </label>
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
                    minLength={8}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Password must be at least 8 characters
                </p>
              </div>
              
              <div className="mb-6">
                <label htmlFor="confirm-password" className="block text-sm font-medium mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={18} className="text-gray-500" />
                  </div>
                  <input
                    type="password"
                    id="confirm-password"
                    className="input pl-10 w-full"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      type="checkbox"
                      className="rounded border-gray-600 text-accent-gold focus:ring-accent-gold"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="terms" className="text-gray-300">
                      I agree to the{' '}
                      <a href="#" className="text-accent-gold hover:underline">
                        Terms of Service
                      </a>{' '}
                      and{' '}
                      <a href="#" className="text-accent-gold hover:underline">
                        Privacy Policy
                      </a>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="age-verify"
                      type="checkbox"
                      className="rounded border-gray-600 text-accent-gold focus:ring-accent-gold"
                      checked={ageVerified}
                      onChange={(e) => setAgeVerified(e.target.checked)}
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="age-verify" className="text-gray-300">
                      I confirm that I am over 18 years of age
                    </label>
                  </div>
                </div>
              </div>
              
              <ActionButton
                onClick={() => {}}
                variant="primary"
                isLoading={isLoading}
                className="w-full"
                type="submit"
              >
                Create Account
              </ActionButton>
            </form>
          </div>
          
          <p className="text-center text-gray-400 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-accent-gold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;