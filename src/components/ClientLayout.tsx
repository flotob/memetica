'use client';

import { PrivyProvider } from './PrivyProvider';
import { Navigation } from './Navigation';
import { ThemeProvider } from '@/contexts/ThemeContext';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <PrivyProvider>
        <div className="relative min-h-screen">
          <header className="container mx-auto px-4 py-4">
            <Navigation />
          </header>
          {children}
        </div>
      </PrivyProvider>
    </ThemeProvider>
  );
} 