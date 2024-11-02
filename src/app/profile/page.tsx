'use client';

import { usePrivy } from '@privy-io/react-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProfilePage() {
  const { user, authenticated, ready } = usePrivy();
  const router = useRouter();

  useEffect(() => {
    if (ready && !authenticated) {
      router.push('/');
    }
  }, [ready, authenticated, router]);

  // Debug log
  console.log('User data:', user);

  if (!ready || !authenticated) return null;

  // Safely handle all user data
  const userEmail = typeof user?.email === 'string' ? user.email : '';
  const username = userEmail ? userEmail.split('@')[0] : 'User';
  const avatarUrl = typeof user?.avatarUrl === 'string' ? user.avatarUrl : '';

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left column - Avatar and basic info */}
          <div className="md:w-1/3">
            <div className="rounded-lg overflow-hidden w-full aspect-square mb-4">
              {avatarUrl ? (
                <img 
                  src={avatarUrl} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500" />
              )}
            </div>
            <h1 className="text-xl font-semibold text-white mb-2">
              {username}
            </h1>
            <p className="text-gray-400 text-sm mb-4">
              {userEmail}
            </p>
          </div>

          {/* Right column - Activity and contributions */}
          <div className="md:w-2/3">
            <div className="bg-gray-800 rounded-lg p-6 mb-6">
              <h2 className="text-lg font-semibold text-white mb-4">Activity</h2>
              <div className="text-gray-400">
                No activity yet
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Your Minds</h2>
              <div className="text-gray-400">
                No minds created yet
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 