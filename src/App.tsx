import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { useThemeStore } from './store/themeStore';

// Pages
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import ProfilePage from './pages/Profile';
import ChatPage from './pages/Chat';
import MessagesPage from './pages/Messages';
import SubscriptionPage from './pages/Subscription';
import StorePage from './pages/Store';
import SettingsPage from './pages/Settings';
import NotFoundPage from './pages/NotFound';
import TermsPage from './pages/Terms';
import PrivacyPage from './pages/Privacy';
import CookiesPage from './pages/Cookies';
import CommunityPage from './pages/Community';

// Components
import Navbar from './components/shared/Navbar';
import Footer from './components/shared/Footer';
import AgeVerification from './components/modals/AgeVerification';

// Protected route component
interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuthStore();
  
  if (isLoading) {
    return <div className="min-h-screen bg-primary flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-gold"></div>
    </div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
};

const App: React.FC = () => {
  const { checkAuth } = useAuthStore();
  const { isDarkMode } = useThemeStore();
  const [isAgeVerified, setIsAgeVerified] = useState(() => {
    return localStorage.getItem('ageVerified') === 'true';
  });
  
  useEffect(() => {
    // Check if user is authenticated on app load
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    // Update body class based on theme
    document.body.classList.toggle('light', !isDarkMode);
  }, [isDarkMode]);

  const handleAgeVerification = (isAdult: boolean) => {
    if (isAdult) {
      localStorage.setItem('ageVerified', 'true');
      setIsAgeVerified(true);
    } else {
      window.location.href = 'https://www.google.com';
    }
  };

  if (!isAgeVerified) {
    return <AgeVerification onVerify={handleAgeVerification} />;
  }
  
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/cookies" element={<CookiesPage />} />
            <Route path="/community" element={<CommunityPage />} />
            
            {/* Protected routes */}
            <Route path="/" element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } />
            <Route path="/chat" element={
              <ProtectedRoute>
                <ChatPage />
              </ProtectedRoute>
            } />
            <Route path="/messages" element={
              <ProtectedRoute>
                <MessagesPage />
              </ProtectedRoute>
            } />
            <Route path="/subscription" element={
              <ProtectedRoute>
                <SubscriptionPage />
              </ProtectedRoute>
            } />
            <Route path="/store" element={
              <ProtectedRoute>
                <StorePage />
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            } />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;