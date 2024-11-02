'use client';

import { useEffect, useState } from 'react';

export function TryMindFAB() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const chatSection = document.getElementById('try-mind-section');
    if (!chatSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(chatSection);
    return () => observer.disconnect();
  }, []);

  const scrollToChat = () => {
    document.getElementById('try-mind-section')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToChat}
      className="fixed bottom-8 right-8 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-all transform hover:scale-105 flex items-center gap-2 z-50"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
      <span className="font-medium">Try this mind</span>
    </button>
  );
} 