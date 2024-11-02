'use client';

import { PrivyProvider } from './PrivyProvider';
import { Navigation } from './Navigation';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider>
      <div className="relative min-h-screen">
        <header className="container mx-auto px-4 py-4">
          <Navigation />
        </header>
        {children}
      </div>
    </PrivyProvider>
  );
} 