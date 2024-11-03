'use client';

import { useState } from 'react';
import Link from 'next/link';
import { UserProfile } from './UserProfile';
import { ThemeSwitcher } from './ThemeSwitcher';

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between">
        <Link href="/" className="text-3xl font-bold text-foreground">
          Memetica
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          <Link 
            href="/minds" 
            className="text-text-secondary hover:text-foreground h-10 flex items-center transition-colors"
          >
            Explore
          </Link>
          <Link href="/minds/create" className="h-10 flex items-center px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
            Add Mind
          </Link>
          <ThemeSwitcher />
          <div className="h-10">
            <UserProfile />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-gray-400 hover:text-white"
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-card-background border-t border-border-color shadow-lg">
          <div className="container mx-auto px-4 py-2 flex flex-col gap-2">
            <Link 
              href="/minds" 
              className="text-text-secondary hover:text-foreground py-3 px-4 rounded-lg hover:bg-card-hover transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Explore
            </Link>
            <Link 
              href="/minds/create" 
              className="text-white py-3 px-4 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Add Mind
            </Link>
            <div className="px-4 py-3 border-t border-gray-800">
              <UserProfile />
            </div>
          </div>
        </div>
      )}
    </>
  );
} 