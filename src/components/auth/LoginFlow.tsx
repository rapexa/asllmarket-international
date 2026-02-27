import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import LoginForm from '@/components/login/LoginForm';
import type { UserRole } from './AuthModal';

interface LoginFlowProps {
  onSuccess: (role: UserRole) => void;
  onClose: () => void;
}

const LoginFlow: React.FC<LoginFlowProps> = ({ onSuccess, onClose }) => {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (data: { email: string; password: string; rememberMe?: boolean }) => {
    setIsLoading(true);
    setError(null);
    try {
      await login(data.email, data.password);
      const role = (localStorage.getItem('userRole') || 'buyer') as UserRole;
      onSuccess(role);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <LoginForm
        onLogin={handleLogin}
        onSwitchToOTP={() => {}}
        onForgotPassword={() => {}}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
};

export default LoginFlow;
