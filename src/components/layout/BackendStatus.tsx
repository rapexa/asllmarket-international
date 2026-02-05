import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const BackendStatus: React.FC = () => {
  const [isOnline, setIsOnline] = useState<boolean | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isMountedRef = useRef(true);
  const lastCheckRef = useRef<number>(0);

  const checkBackendStatus = useCallback(async () => {
    // Prevent multiple simultaneous checks
    const now = Date.now();
    if (now - lastCheckRef.current < 5000) {
      return;
    }
    lastCheckRef.current = now;

    if (!isMountedRef.current) return;
    
    try {
      const apiUrl = import.meta.env.PROD 
        ? 'https://asllmarket.org/backend/healthz'
        : 'http://localhost:8083/healthz';
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);
      
      const response = await fetch(apiUrl, {
        method: 'GET',
        signal: controller.signal,
        cache: 'no-store',
      });
      
      clearTimeout(timeoutId);
      
      if (!isMountedRef.current) return;
      
      if (response.ok) {
        const data = await response.json();
        const newStatus = data.status === 'ok';
        setIsOnline(prev => {
          // Only update if status actually changed
          if (prev !== newStatus) {
            return newStatus;
          }
          return prev;
        });
      } else {
        setIsOnline(prev => {
          if (prev !== false) return false;
          return prev;
        });
      }
    } catch (error) {
      if (!isMountedRef.current) return;
      setIsOnline(prev => {
        if (prev !== false) return false;
        return prev;
      });
    }
  }, []);

  useEffect(() => {
    isMountedRef.current = true;
    
    // Initial check after a delay to avoid blocking render
    const initialTimeout = setTimeout(() => {
      if (isMountedRef.current) {
        checkBackendStatus();
      }
    }, 2000);
    
    // Check every 60 seconds (less frequent to avoid issues)
    intervalRef.current = setInterval(() => {
      if (isMountedRef.current) {
        checkBackendStatus();
      }
    }, 60000);
    
    return () => {
      isMountedRef.current = false;
      clearTimeout(initialTimeout);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [checkBackendStatus]);

  // Don't render until first check completes
  if (isOnline === null) {
    return null;
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

export default React.memo(BackendStatus);
