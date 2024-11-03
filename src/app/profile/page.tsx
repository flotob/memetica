'use client';

import { usePrivy, useWallets } from '@privy-io/react-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// Industry standard way to shorten wallet addresses
function formatAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export default function ProfilePage() {
  const { user, authenticated, ready, linkGithub, linkedAccounts, createWallet } = usePrivy();
  const { wallets } = useWallets();
  const router = useRouter();

  useEffect(() => {
    if (ready && !authenticated) {
      router.push('/');
    }
  }, [ready, authenticated, router]);

  if (!ready || !authenticated) return null;

  const hasGithub = linkedAccounts?.some(account => account.type === 'github');
  const hasWallet = wallets && wallets.length > 0;
  const walletAddress = hasWallet ? wallets[0].address : null;
  const username = walletAddress ? formatAddress(walletAddress) : 'anon';

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {!hasWallet && (
          <div className="mb-6 bg-card-background border border-border-color rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-foreground font-semibold mb-2">Create Your Wallet</h2>
                <p className="text-text-secondary">Set up your wallet to participate in the memetica ecosystem</p>
              </div>
              <button
                onClick={() => createWallet()}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg flex items-center gap-2 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Create Wallet
              </button>
            </div>
          </div>
        )}

        {!hasGithub && (
          <div className="mb-6 bg-card-background border border-border-color rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-foreground text-xl font-bold mb-1">Connect GitHub</h2>
                <p className="text-text-secondary">Link your GitHub account to showcase your models and contributions</p>
              </div>
              <button className="bg-card-background border border-border-color hover:bg-card-hover text-foreground px-4 py-2 rounded-lg inline-flex items-center gap-2 transition-colors">
                Connect GitHub
              </button>
            </div>
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <div className="rounded-lg overflow-hidden w-full aspect-square mb-4 bg-gradient-to-br from-blue-500 to-purple-500" />
            <h1 className="text-xl font-semibold text-white mb-2">
              {username}
            </h1>
          </div>

          <div className="md:w-2/3">
            <div className="bg-card-background border border-border-color rounded-lg p-6 mb-6">
              <h2 className="text-foreground">Activity</h2>
              <p className="text-text-secondary">No activity yet</p>
            </div>

            <div className="bg-card-background border border-border-color rounded-lg p-6">
              <h2 className="text-foreground">Your Minds</h2>
              <p className="text-text-secondary">No minds created yet</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 