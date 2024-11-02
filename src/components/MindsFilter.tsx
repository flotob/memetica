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
    <div className="space-y-4 p-4 bg-white rounded-lg shadow-sm">
      <div>
        <input
          type="text"
          placeholder="Search minds..."
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={filters.search}
          onChange={(e) => handleChange({ search: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Model
        </label>
        <select
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={filters.model}
          onChange={(e) => handleChange({ model: e.target.value })}
        >
          <option value="">All Models</option>
          {models.map((model) => (
            <option key={model} value={model}>
              {model}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tags
        </label>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => {
                const newTags = filters.tags.includes(tag)
                  ? filters.tags.filter((t) => t !== tag)
                  : [...filters.tags, tag];
                handleChange({ tags: newTags });
              }}
              className={`px-3 py-1 rounded-full text-sm ${
                filters.tags.includes(tag)
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Sort By
        </label>
        <select
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={filters.sort}
          onChange={(e) => handleChange({ sort: e.target.value as FilterState['sort'] })}
        >
          <option value="newest">Newest</option>
          <option value="popular">Most Popular</option>
          <option value="forked">Most Forked</option>
        </select>
      </div>
    </div>
  );
} 