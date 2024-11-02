'use client';

import { PrivyProvider as Provider } from '@privy-io/react-auth';

export function PrivyProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider
      appId="cm30ilzuk0353cm4fn2hevf87"
      config={{
        loginMethods: ['email'],
        appearance: {
          theme: 'dark',
          accentColor: '#3b82f6',
          showWalletLoginFirst: false,
        },
      }}
    >
      {children}
    </Provider>
  );
} 