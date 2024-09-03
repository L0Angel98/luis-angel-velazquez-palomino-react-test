import React, { useEffect, useRef, useCallback } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/userSlice";
import secureLocalStorage from "../../utils/secureLocalStorage";

interface AutoLogoutProps {
  children: React.ReactNode;
}

const AutoLogout: React.FC<AutoLogoutProps> = ({ children }) => {
  const dispatch = useDispatch();
  const activityTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = useCallback(() => {

    if (activityTimeoutRef.current) {
      clearTimeout(activityTimeoutRef.current);
    }

    activityTimeoutRef.current = setTimeout(() => {
      dispatch(logout());
      secureLocalStorage.removeSecureItem("authToken");
    }, 5 * 60 * 1000); // 5 minutos
  }, [dispatch]);

  useEffect(() => {

    const handleActivity = () => resetTimer();

    const throttledHandleActivity = throttle(handleActivity, 500);

    window.addEventListener("mousemove", throttledHandleActivity);
    window.addEventListener("keydown", throttledHandleActivity);

    resetTimer();

    return () => {
      window.removeEventListener("mousemove", throttledHandleActivity);
      window.removeEventListener("keydown", throttledHandleActivity);

      if (activityTimeoutRef.current) {
        clearTimeout(activityTimeoutRef.current);
      }
    };
  }, [resetTimer]);

  return <>{children}</>;
};

function throttle(fn: Function, wait: number) {
  let lastTime = 0;
  return function (...args: any[]) {
    const now = new Date().getTime();
    if (now - lastTime >= wait) {
      fn(...args);
      lastTime = now;
    }
  };
}

export default AutoLogout;
