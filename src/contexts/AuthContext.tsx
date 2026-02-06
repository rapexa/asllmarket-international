import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService, User } from '@/services';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    email: string;
    password: string;
    fullName: string;
    phone?: string;
    role: 'buyer' | 'supplier' | 'market' | 'visitor';
  }) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Load user on mount
  useEffect(() => {
    let isMounted = true;
    
    const loadUser = async () => {
      try {
        const currentUser = await authService.me();
        if (isMounted) {
          setUser(currentUser);
        }
      } catch (error: any) {
        // Don't redirect on 401 - just set user to null
        // Redirect should only happen on actual API calls, not on initial load
        if (isMounted) {
          console.error('Failed to load user:', error);
          setUser(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadUser();
    
    return () => {
      isMounted = false;
    };
  }, []);

  const login = async (email: string, password: string) => {
    const response = await authService.login({ email, password });
    // Persist role and token for other parts of the app that rely on localStorage
    try {
      localStorage.setItem('userRole', response.user.role);
      // Backwards-compatible key used in some legacy code
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('userEmail', response.user.email);
    } catch {
      // ignore storage errors
    }
    setUser(response.user);
  };

  const register = async (data: {
    email: string;
    password: string;
    fullName: string;
    phone?: string;
    role: 'buyer' | 'supplier' | 'market' | 'visitor';
  }) => {
    const response = await authService.register(data);
    try {
      localStorage.setItem('userRole', response.user.role);
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('userEmail', response.user.email);
    } catch {
      // ignore storage errors
    }
    setUser(response.user);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
