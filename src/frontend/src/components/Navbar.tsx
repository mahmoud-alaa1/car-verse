import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Car, Search, MoreHorizontal, Moon, Sun, LogOut, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import { toast } from 'sonner';

export const Navbar: React.FC = () => {
  const [isDark, setIsDark] = useState(true);
  const { state, dispatch } = useApp();
  const navigate = useNavigate();

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 glass border-b border-border/30 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link to="/" className="flex items-center space-x-3 hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg gradient-primary animate-pulse-glow">
              <Car className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">CarCommunity</h1>
              <p className="text-xs text-muted-foreground">Drive. Share. Connect.</p>
            </div>
          </Link>

          {/* Navigation Icons */}
          <div className="flex items-center space-x-2">
            <Button variant="glass" size="icon" className="hover:scale-105 transition-all duration-300">
              <Search className="w-5 h-5" />
            </Button>
            
            {state.isLoggedIn ? (
              <>
                <Link to="/cars">
                  <Button variant="glass" size="icon" className="hover:scale-105 transition-all duration-300">
                    <Car className="w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/profile">
                  <Button variant="glass" size="icon" className="hover:scale-105 transition-all duration-300">
                    <User className="w-5 h-5" />
                  </Button>
                </Link>
                <Button 
                  variant="glass" 
                  size="icon" 
                  className="hover:scale-105 transition-all duration-300"
                  onClick={handleLogout}
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </Button>
              </>
            ) : (
              <Link to="/login">
                <Button variant="glass" size="icon" className="hover:scale-105 transition-all duration-300">
                  <User className="w-5 h-5" />
                </Button>
              </Link>
            )}
            
            <Button 
              variant="glass" 
              size="icon" 
              className="hover:scale-105 transition-all duration-300"
              onClick={toggleDarkMode}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
            <Button variant="glass" size="icon" className="hover:scale-105 transition-all duration-300">
              <MoreHorizontal className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};