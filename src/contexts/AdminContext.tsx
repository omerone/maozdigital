'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';

interface AdminContextValue {
  isAdmin: boolean;
  isLoading: boolean;
  refresh: () => Promise<void>;
}

const AdminContext = createContext<AdminContextValue>({
  isAdmin: false,
  isLoading: true,
  refresh: async () => {},
});

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/login', { cache: 'no-store' });
      if (!response.ok) {
        setIsAdmin(false);
        return;
      }

      const data = await response.json();
      setIsAdmin(Boolean(data?.authenticated));
    } catch (error) {
      console.error('Failed checking admin session:', error);
      setIsAdmin(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <AdminContext.Provider value={{ isAdmin, isLoading, refresh }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);


