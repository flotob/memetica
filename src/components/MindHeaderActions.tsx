'use client';

import Link from 'next/link';

interface MindHeaderActionsProps {
  mindId: string;
}

export function MindHeaderActions({ mindId }: MindHeaderActionsProps) {
  const scrollToAPI = () => {
    document.getElementById('api-section')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <div className="flex justify-between items-center mb-6">
      <Link 
        href="/minds" 
        className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Minds
      </Link>

      <button
        onClick={scrollToAPI}
        className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
      >
        API Docs
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>
  );
} 