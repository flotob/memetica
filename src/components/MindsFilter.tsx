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
    <div className="space-y-6">
      <input
        type="text"
        value={filters.search}
        onChange={(e) => handleChange({ search: e.target.value })}
        placeholder="Search minds..."
        className="w-full px-4 py-2 bg-gray-800 rounded-lg text-white placeholder-gray-400 
          border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 
          focus:border-transparent"
      />

      <div>
        <h2 className="text-lg font-medium mb-2 text-white">Model</h2>
        <select
          value={filters.model}
          onChange={(e) => handleChange({ model: e.target.value })}
          className="w-full px-4 py-2 bg-gray-800 rounded-lg text-white border border-gray-700 
            focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Models</option>
          {models.map(model => (
            <option key={model} value={model} className="text-white bg-gray-800">
              {model}
            </option>
          ))}
        </select>
      </div>

      <div>
        <h2 className="text-lg font-medium mb-2 text-white">Tags</h2>
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <button
              key={tag}
              onClick={() => {
                const newTags = filters.tags.includes(tag)
                  ? filters.tags.filter((t) => t !== tag)
                  : [...filters.tags, tag];
                handleChange({ tags: newTags });
              }}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors
                ${filters.tags.includes(tag)
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-medium mb-2 text-white">Sort By</h2>
        <select
          value={filters.sort}
          onChange={(e) => handleChange({ sort: e.target.value as FilterState['sort'] })}
          className="w-full px-4 py-2 bg-gray-800 rounded-lg text-white border border-gray-700 
            focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="newest" className="text-white bg-gray-800">Newest</option>
          <option value="popular" className="text-white bg-gray-800">Popular</option>
          <option value="forked" className="text-white bg-gray-800">Most Forked</option>
        </select>
      </div>
    </div>
  );
} 