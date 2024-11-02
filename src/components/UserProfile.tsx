'use client';

import { usePrivy } from '@privy-io/react-auth';
import { UserDropdown } from './UserDropdown';

export function UserProfile() {
  const { login, ready, authenticated } = usePrivy();

  if (!ready) return null;

  if (authenticated) {
    return <UserDropdown />;
  }

  return (
    <button
      onClick={() => login()}
      className="w-10 h-10 rounded-full overflow-hidden hover:ring-2 hover:ring-blue-500 transition-all flex items-center justify-center"
    >
      <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500" />
    </button>
  );
} 