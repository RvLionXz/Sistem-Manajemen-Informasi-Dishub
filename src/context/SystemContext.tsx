'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Definisikan tipe data agar TypeScript senang
interface SystemSchema {
  menus: any[];
  pages: any[];
}

interface SystemContextType {
  schema: SystemSchema | null;
  isLoading: boolean;
}

const SystemContext = createContext<SystemContextType>({
  schema: null,
  isLoading: true,
});

export const useSystem = () => useContext(SystemContext);

export const SystemProvider = ({ children }: { children: ReactNode }) => {
  const [schema, setSchema] = useState<SystemSchema | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSchema = async () => {
      try {
        const response = await fetch('/api/system/schema');
        const data = await response.json();
        setSchema(data);
      } catch (error) {
        console.error('Failed to load system schema:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSchema();
  }, []);

  return (
    <SystemContext.Provider value={{ schema, isLoading }}>
      {children}
    </SystemContext.Provider>
  );
};