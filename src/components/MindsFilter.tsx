import { useState } from 'react';

interface MindsFilterProps {
  tags: string[];
  models: string[];
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  search: string;
  tags: string[];
  model: string;
  sort: 'newest' | 'popular' | 'forked';
}

export function MindsFilter({ tags, models, onFilterChange }: MindsFilterProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    tags: [],
    model: '',
    sort: 'newest'
  });

  const handleChange = (updates: Partial<FilterState>) => {
    const newFilters = { ...filters, ...updates };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Search minds..."
        className="w-full px-4 py-2.5 rounded-lg
          bg-input-background
          border border-input-border
          text-input-text placeholder-input-placeholder
          focus:outline-none focus:ring-2 focus:ring-blue-500
          transition-colors"
      />

      <select
        className="w-full px-4 py-2.5 rounded-lg
          bg-input-background
          border border-input-border
          text-input-text
          focus:outline-none focus:ring-2 focus:ring-blue-500
          transition-colors"
      >
        <option>All Models</option>
        <option>GPT-4</option>
        <option>Claude-2</option>
      </select>

      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <button
            key={tag}
            className="px-3 py-1.5 rounded-full
              bg-tag-background text-tag-text
              hover:bg-tag-hover
              text-sm font-medium
              transition-colors"
          >
            {tag}
          </button>
        ))}
      </div>

      <select
        className="w-full px-4 py-2.5 rounded-lg
          bg-input-background
          border border-input-border
          text-input-text
          focus:outline-none focus:ring-2 focus:ring-blue-500
          transition-colors"
      >
        <option>Newest</option>
        <option>Popular</option>
        <option>Most Forked</option>
      </select>
    </div>
  );
} 