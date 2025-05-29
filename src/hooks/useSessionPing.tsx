import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useRef } from "react";

export function useSessionPing(pingInterval = 60 * 5 * 1000) {
  const { extendSession } = useAuth();
  const lastActivity = useRef(Date.now());

  useEffect(() => {
    const updateActivity = () => {
      lastActivity.current = Date.now();
    };

    window.addEventListener("mousemove", updateActivity);
    window.addEventListener("keydown", updateActivity);
    window.addEventListener("scroll", updateActivity);

    const interval = setInterval(() => {
      const now = Date.now();
      if (now - lastActivity.current < pingInterval) {
        extendSession();
      }
    }, pingInterval);

    return () => {
      clearInterval(interval);
      window.removeEventListener("mousemove", updateActivity);
      window.removeEventListener("keydown", updateActivity);
      window.removeEventListener("scroll", updateActivity);
    };
  }, [pingInterval, extendSession]);
}
