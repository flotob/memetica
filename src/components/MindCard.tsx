import Link from 'next/link';
import { Mind } from '@/types/mind';

interface MindCardProps {
  mind: Mind;
}

export function MindCard({ mind }: MindCardProps) {
  return (
    <Link 
      href={`/minds/${mind.id}`}
      className="block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
    >
      <h3 className="text-lg font-semibold text-gray-900">{mind.name}</h3>
      <p className="mt-2 text-sm text-gray-600 line-clamp-2">{mind.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {mind.metadata.tags.map(tag => (
          <span 
            key={tag}
            className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-4 text-sm text-gray-500">
        <span>Model: {mind.model.name}</span>
        <span className="mx-2">•</span>
        <span>By: {mind.metadata.creator}</span>
      </div>
    </Link>
  );
} 