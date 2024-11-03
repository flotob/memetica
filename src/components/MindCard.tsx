import Link from 'next/link';
import { Mind } from '@/types/mind';

interface MindCardProps {
  mind: Mind;
}

export function MindCard({ mind }: MindCardProps) {
  return (
    <Link 
      href={`/minds/${mind.id}`} 
      className="block cursor-pointer"
    >
      <div className="bg-card-background rounded-xl p-6 
        transition-all duration-200 ease-in-out
        hover:transform hover:-translate-y-1 
        hover:bg-card-hover
        border border-border-color
        hover:shadow-lg hover:shadow-black/5"
      >
        <h2 className="text-xl font-semibold mb-2 text-foreground">
          {mind.name}
        </h2>
        
        <p className="text-text-secondary mb-4 line-clamp-2">
          {mind.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {mind.metadata.tags.map(tag => (
            <span
              key={tag}
              className="px-3 py-1.5 bg-tag-background text-tag-text 
                rounded-full text-sm font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 text-text-tertiary text-sm">
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            {mind.model.name}
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            {mind.metadata.creator}
          </div>
        </div>
      </div>
    </Link>
  );
} 