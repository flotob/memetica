'use client';

import { useEffect, useState } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

export function ScrollToChat() {
  const [chatRef, isVisible] = useIntersectionObserver<HTMLDivElement>();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    setShowButton(!isVisible);
  }, [isVisible]);

  const scrollToChat = () => {
    document.getElementById('try-mind-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!showButton) return null;

  return (
    <button
      onClick={scrollToChat}
      className="fixed bottom-6 right-6 px-4 py-2 
        bg-blue-500 text-white rounded-lg 
        hover:bg-blue-600 transition-colors
        shadow-lg"
    >
      Try this mind
    </button>
  );
} 