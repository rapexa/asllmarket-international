import React, { useState, useEffect } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const BackendStatus: React.FC = () => {
  const [isOnline, setIsOnline] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const checkBackendStatus = async () => {
    setIsChecking(true);
    try {
      const apiUrl = import.meta.env.PROD 
        ? 'https://asllmarket.org/backend/healthz'
        : 'http://localhost:8083/healthz';
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);
      
      const response = await fetch(apiUrl, {
        method: 'GET',
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      
      if (response.ok) {
        const data = await response.json();
        setIsOnline(data.status === 'ok');
      } else {
        setIsOnline(false);
      }
    } catch (error) {
      setIsOnline(false);
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    // Check immediately
    checkBackendStatus();
    
    // Check every 30 seconds
    const interval = setInterval(checkBackendStatus, 30000);
    
    return () => clearInterval(interval);
  }, []);

  if (isOnline === null && !isChecking) {
    return null; // Don't show anything until first check
  }

  return (
    <div
      className={cn(
        "flex items-center gap-1.5 px-2 py-1 rounded-md text-xs transition-colors backdrop-blur-sm",
        isOnline 
          ? "bg-green-500/20 text-green-100 border border-green-400/30" 
          : "bg-red-500/20 text-red-100 border border-red-400/30"
      )}
      title={isOnline ? "Backend Connected" : "Backend Disconnected"}
    >
      {isOnline ? (
        <>
          <CheckCircle2 className="h-3 w-3" />
          <span className="hidden sm:inline font-medium">Connected</span>
        </>
      ) : (
        <>
          <XCircle className="h-3 w-3" />
          <span className="hidden sm:inline font-medium">Disconnected</span>
        </>
      )}
    </div>
  );
};

export default BackendStatus;
