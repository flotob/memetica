import Link from 'next/link';
import { Mind } from '@/types/mind';

interface MindCardProps {
  mind: Mind;
}

export function MindCard({ mind }: MindCardProps) {
  return (
    <Link 
      href={`/minds/${mind.id}`} 
      className="block hover:opacity-80 transition-opacity cursor-pointer"
    >
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-2 text-white">
          {mind.name}
        </h2>
        
        <p className="text-gray-400 mb-4 line-clamp-2">
          {mind.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {mind.metadata.tags.map(tag => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-900 text-gray-300 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="text-sm text-gray-400">
          <span>Model: {mind.model.name}</span>
          <span className="mx-2">•</span>
          <span>By: {mind.metadata.creator}</span>
        </div>
      </div>
    </Link>
  );
} 