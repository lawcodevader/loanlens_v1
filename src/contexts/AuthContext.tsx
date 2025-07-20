import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { UserRole, roles } from '../constants/roles';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (mobile: string) => Promise<void>;
  verifyOtp: (otp: string) => Promise<boolean>;
  logout: () => void;
  completeProfile: (name: string, email: string, role: UserRole) => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('pvlas_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // Temporary auto-login for testing
      const testUser: User = {
        id: 'test-admin',
        mobile: '1234567890',
        name: 'Test Admin',
        email: 'admin@test.com',
        role: roles.ADMIN,
      };
      setUser(testUser);
      localStorage.setItem('pvlas_user', JSON.stringify(testUser));
    }
    setLoading(false);
  }, []);

  const login = async (mobile: string): Promise<void> => {
    // In a real app, this would make an API call to request OTP
    console.log(`Sending OTP to ${mobile}`);
    
    // Mock OTP sent - this would be handled by the server
    localStorage.setItem('pvlas_pending_mobile', mobile);
    
    // In a real implementation, we would not return anything here,
    // as the OTP would be sent to the user's phone
    return Promise.resolve();
  };

  const verifyOtp = async (otp: string): Promise<boolean> => {
    // In a real app, this would verify the OTP with the server
    const mobile = localStorage.getItem('pvlas_pending_mobile');
    
    if (!mobile) {
      return Promise.reject('No pending mobile verification');
    }

    // Mock verification - this would be handled by the server
    // For demo purposes, any 4-digit OTP is valid
    if (otp.length === 4 && /^\d+$/.test(otp)) {
      // Check if this is a first-time user (would check with server in real app)
      const isNewUser = !localStorage.getItem(`pvlas_user_${mobile}`);
      
      if (!isNewUser) {
        // Load existing user data
        const userData = JSON.parse(localStorage.getItem(`pvlas_user_${mobile}`) || '{}');
        setUser(userData);
        localStorage.setItem('pvlas_user', JSON.stringify(userData));
      } else {
        // Create a temporary user - they need to complete their profile
        const tempUser = {
          id: `user-${Date.now()}`,
          mobile,
          name: '',
          email: '',
          role: '',
        };
        setUser(tempUser);
        localStorage.setItem('pvlas_user', JSON.stringify(tempUser));
      }
      
      localStorage.removeItem('pvlas_pending_mobile');
      return Promise.resolve(!isNewUser);
    }
    
    return Promise.resolve(false);
  };

  const completeProfile = async (name: string, email: string, role: UserRole): Promise<void> => {
    if (!user) {
      return Promise.reject('No active user session');
    }
    
    // Update user profile
    const updatedUser = {
      ...user,
      name,
      email,
      role,
    };
    
    // Save updated user
    setUser(updatedUser);
    localStorage.setItem('pvlas_user', JSON.stringify(updatedUser));
    localStorage.setItem(`pvlas_user_${user.mobile}`, JSON.stringify(updatedUser));
    
    return Promise.resolve();
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('pvlas_user');
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        loading, 
        login, 
        verifyOtp, 
        logout, 
        completeProfile,
        isAuthenticated: !!user 
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