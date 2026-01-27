import React from 'react';
import { UserProfile } from '../types';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  BookOpen, 
  Users, 
  BarChart2, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Shield
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  user: UserProfile;
}

const Layout: React.FC<LayoutProps> = ({ children, user }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const location = useLocation();

  const handleLogout = () => {
    signOut(auth);
  };

  const navItems = [
    { label: 'Dashboard', icon: Home, path: '/dashboard' },
    { label: 'AI Study', icon: BookOpen, path: '/ai' },
    { label: 'Community', icon: Users, path: '/community' },
    { label: 'Analytics', icon: BarChart2, path: '/analytics' },
  ];

  if (user.role === 'admin') {
    navItems.push({ label: 'Admin', icon: Shield, path: '/admin' });
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b p-4 flex justify-between items-center sticky top-0 z-20">
        <h1 className="text-xl font-bold text-brand-600">Students Hub</h1>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-10 w-64 bg-white border-r transform transition-transform duration-200 ease-in-out
        md:translate-x-0 md:static md:h-screen sticky top-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 border-b hidden md:block">
          <h1 className="text-2xl font-bold text-brand-600">Students Hub</h1>
          <p className="text-xs text-gray-500 mt-1">Learn efficiently.</p>
        </div>
        
        <div className="p-4">
          <div className="flex items-center gap-3 p-3 bg-brand-50 rounded-lg mb-6">
            <img 
              src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}`} 
              alt="User" 
              className="w-10 h-10 rounded-full bg-gray-300"
            />
            <div className="overflow-hidden">
              <p className="font-semibold text-sm truncate">{user.displayName}</p>
              <p className="text-xs text-gray-500 capitalize">{user.role}</p>
            </div>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                    isActive 
                      ? 'bg-brand-500 text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="absolute bottom-0 w-full p-4 border-t bg-white space-y-2">
            <button 
              onClick={handleLogout}
              className="flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 w-full rounded-md transition-colors"
            >
              <LogOut size={20} />
              <span>Sign Out</span>
            </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto h-screen">
        {/* Ad Placeholder for Monetization */}
        <div className="w-full h-16 bg-gray-200 border border-dashed border-gray-400 rounded-lg mb-6 flex items-center justify-center text-gray-500 text-sm">
          Advertisement Banner Area (Monetization Ready)
        </div>
        {children}
      </main>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-0 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Layout;