import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import RegisterFlow from '@/components/register/RegisterFlow';
import type { UserRole } from '@/components/register/RegisterFlow';

const Register: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const roleParam = searchParams.get('role') as UserRole | null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <RegisterFlow 
        initialRole={roleParam || undefined}
        onComplete={(role) => {
          // Redirect based on role
          if (role === 'buyer') {
            navigate('/dashboard/buyer');
          } else if (role === 'supplier') {
            navigate('/dashboard/supplier');
          } else if (role === 'visitor') {
            navigate('/dashboard/visitor');
          } else if (role === 'market') {
            navigate('/dashboard/market');
          } else {
            navigate('/dashboard');
          }
        }} 
      />
    </div>
  );
};

export default Register;

