'use client';

import { usePrivy } from '@privy-io/react-auth';

export function PrivyTest() {
  const { ready } = usePrivy();
  
  return (
    <div className="text-white">
      Privy Status: {ready ? 'Ready' : 'Loading'}
    </div>
  );
} 