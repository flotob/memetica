'use client';

import { usePrivy } from '@privy-io/react-auth';
import { UserDropdown } from './UserDropdown';

export function UserProfile() {
  const { login, ready, authenticated } = usePrivy();

  if (!ready) {
    return (
      <div className="w-10 h-10 rounded-full bg-gray-800 animate-pulse" />
    );
  }

  if (!authenticated) {
    return (
      <button
        onClick={() => login()}
        className="w-10 h-10 rounded-full overflow-hidden hover:ring-2 hover:ring-blue-500 transition-all flex items-center justify-center bg-gray-800"
      >
        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </button>
    );
  }

  return <UserDropdown />;
} 