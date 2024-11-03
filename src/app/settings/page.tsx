'use client';

import { usePrivy, useWallets } from '@privy-io/react-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SettingsPage() {
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-8">Settings</h1>

        <div className="space-y-6">
          {/* Profile Section */}
          <div className="bg-card-background border border-border-color rounded-lg p-6">
            <h2 className="text-foreground font-semibold mb-4">Profile Settings</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Email Address</label>
                <div className="bg-card-background border border-border-color rounded-lg p-4 font-mono text-text-secondary">
                  {user?.email?.address || 'No email connected'}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">User ID</label>
                <div className="bg-card-background border border-border-color rounded-lg p-4 font-mono text-text-secondary">
                  {user?.id}
                </div>
              </div>

              {walletAddress && (
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Wallet Address</label>
                  <div className="bg-card-background border border-border-color rounded-lg p-4 font-mono text-text-secondary">
                    {walletAddress}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Connections Section */}
          <div className="bg-card-background border border-border-color rounded-lg p-6">
            <h2 className="text-foreground font-semibold mb-4">Connected Accounts</h2>
            
            <div className="space-y-4">
              {/* Wallet Status */}
              {!hasWallet && (
                <div className="flex items-center justify-between py-3 px-4 bg-gray-700/50 rounded-lg">
                  <div>
                    <h3 className="text-foreground font-medium">Wallet</h3>
                    <p className="text-sm text-text-secondary">Create a wallet to participate in the ecosystem</p>
                  </div>
                  <button
                    onClick={() => createWallet()}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    Create Wallet
                  </button>
                </div>
              )}

              {/* GitHub Status */}
              {!hasGithub && (
                <div className="bg-card-background border border-border-color rounded-lg p-6 flex items-center justify-between">
                  <div>
                    <h3 className="text-foreground text-lg font-medium mb-1">GitHub</h3>
                    <p className="text-text-secondary">Connect your GitHub account to showcase your contributions</p>
                  </div>
                  <button className="bg-card-background border border-border-color hover:bg-card-hover text-foreground px-4 py-2 rounded-lg transition-colors">
                    Connect GitHub
                  </button>
                </div>
              )}

              {/* Connected Services List */}
              <div className="space-y-2">
                {hasWallet && (
                  <div className="flex items-center gap-2 text-green-400 text-sm">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Wallet Connected
                  </div>
                )}
                {hasGithub && (
                  <div className="flex items-center gap-2 text-green-400 text-sm">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    GitHub Connected
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 