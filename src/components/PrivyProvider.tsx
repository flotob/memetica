'use client';

import { PrivyProvider as Privy } from '@privy-io/react-auth';
import { useRouter } from 'next/navigation';

export function PrivyProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <Privy
      appId="cm30ilzuk0353cm4fn2hevf87"
      config={{
        loginMethods: ['email', 'google', 'github'],
        appearance: {
          theme: 'dark',
          accentColor: '#3b82f6',
        },
      }}
      onSuccess={() => router.refresh()}
    >
      {children}
    </Privy>
  );
} 