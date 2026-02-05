import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const BackendStatus: React.FC = () => {
  const [isOnline, setIsOnline] = useState<boolean | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isMountedRef = useRef(true);

  const checkBackendStatus = useCallback(async () => {
    if (!isMountedRef.current) return;
    
    try {
      const apiUrl = import.meta.env.PROD 
        ? 'https://asllmarket.org/backend/healthz'
        : 'http://localhost:8083/healthz';
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);
      
      const response = await fetch(apiUrl, {
        method: 'GET',
        signal: controller.signal,
        cache: 'no-cache',
      });
      
      clearTimeout(timeoutId);
      
      if (!isMountedRef.current) return;
      
      if (response.ok) {
        const data = await response.json();
        setIsOnline(prev => {
          // Only update if state actually changed to prevent unnecessary re-renders
          if (prev !== (data.status === 'ok')) {
            return data.status === 'ok';
          }
          return prev;
        });
      } else {
        setIsOnline(prev => prev !== false ? false : prev);
      }
    } catch (error) {
      if (!isMountedRef.current) return;
      setIsOnline(prev => prev !== false ? false : prev);
    }
  }, []);

  useEffect(() => {
    isMountedRef.current = true;
    
    // Check immediately (with delay to avoid blocking initial render)
    const initialTimeout = setTimeout(() => {
      if (isMountedRef.current) {
        checkBackendStatus();
      }
    }, 1000);
    
    // Check every 30 seconds
    intervalRef.current = setInterval(() => {
      if (isMountedRef.current) {
        checkBackendStatus();
      }
    }, 30000);
    
    return () => {
      isMountedRef.current = false;
      clearTimeout(initialTimeout);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [checkBackendStatus]);

  if (isOnline === null) {
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

export default React.memo(BackendStatus);
