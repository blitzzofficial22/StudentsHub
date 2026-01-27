import React, { useEffect, useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './firebase';
import { UserProfile } from './types';

// Pages & Components
import Layout from './components/Layout';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import AIStudy from './pages/AIStudy';
import Community from './pages/Community';
import Analytics from './pages/Analytics';
import Admin from './pages/Admin';
import LandingPage from './pages/LandingPage';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Mock profile data since we don't have real Firestore read setup in this generated code
        // In a real app, you would fetch this from Firestore `users` collection
        
        // Check if the user is the specific admin
        const isAdmin = currentUser.email === 'mashoodfarouk@gmail.com';

        setUserProfile({
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
          role: isAdmin ? 'admin' : 'student',
          points: 1250,
          streak: 5,
          badges: ['Early Bird', 'Quiz Master']
        });
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600"></div>
      </div>
    );
  }

  return (
    <HashRouter>
      <Routes>
        {/* Public Landing Page. If logged in, redirect to Dashboard */}
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <LandingPage />} />
        
        {/* Auth Page. If logged in, redirect to Dashboard */}
        <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <AuthPage />} />
        
        {/* Protected Dashboard */}
        <Route path="/dashboard" element={
          user && userProfile ? (
            <Layout user={userProfile}>
              <Dashboard user={userProfile} />
            </Layout>
          ) : <Navigate to="/login" />
        } />

        {/* Other Protected Routes */}
        <Route path="/ai" element={
          user && userProfile ? (
            <Layout user={userProfile}>
              <AIStudy />
            </Layout>
          ) : <Navigate to="/login" />
        } />

        <Route path="/community" element={
          user && userProfile ? (
            <Layout user={userProfile}>
              <Community user={userProfile} />
            </Layout>
          ) : <Navigate to="/login" />
        } />

        <Route path="/analytics" element={
          user && userProfile ? (
            <Layout user={userProfile}>
              <Analytics />
            </Layout>
          ) : <Navigate to="/login" />
        } />

        <Route path="/admin" element={
          user && userProfile?.role === 'admin' ? (
            <Layout user={userProfile}>
              <Admin />
            </Layout>
          ) : <Navigate to="/dashboard" />
        } />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </HashRouter>
  );
};

export default App;