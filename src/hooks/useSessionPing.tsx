import { useEffect, useRef } from "react";

export function useSessionPing(pingInterval = 5 * 60 * 1000) {
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
        fetch("/api/session/refresh", {
          method: "GET",
          cache: "no-store", // 세션 상태 반영 최신화 위해 no-cache 옵션
        }).catch(() => {
          // 실패 시 처리 (옵션)
        });
      }
    }, pingInterval);

    return () => {
      clearInterval(interval);
      window.removeEventListener("mousemove", updateActivity);
      window.removeEventListener("keydown", updateActivity);
      window.removeEventListener("scroll", updateActivity);
    };
  }, [pingInterval]);
}
