'use client';

import { useState } from 'react';
import { Mind } from '@/types/mind';

interface ForkButtonProps {
  mind: Mind;
}

export function ForkButton({ mind }: ForkButtonProps) {
  const [isForking, setIsForking] = useState(false);

  const handleFork = async () => {
    setIsForking(true);
    try {
      const response = await fetch(`/api/minds/${mind.id}/fork`, {
        method: 'POST',
      });
      
      if (response.ok) {
        const data = await response.json();
        window.location.href = `/minds/${data.id}/edit`;
      } else {
        throw new Error('Failed to fork mind');
      }
    } catch (error) {
      console.error('Error forking mind:', error);
      // TODO: Add proper error toast notification
      alert('Failed to fork mind');
    } finally {
      setIsForking(false);
    }
  };

  return (
    <button
      onClick={handleFork}
      disabled={isForking}
      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
    >
      {isForking ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Forking...
        </>
      ) : (
        <>
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
          Fork this mind
        </>
      )}
    </button>
  );
} 