'use client';
import { createContext, useContext } from 'react';
import { usePathname } from 'next/navigation';

const PathnameContext = createContext<string>('');

export function PathnameProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <PathnameContext.Provider value={pathname}>
      {children}
    </PathnameContext.Provider>
  );
}

export function useCurrentPathname() {
  return useContext(PathnameContext);
}
