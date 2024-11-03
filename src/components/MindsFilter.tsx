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
    model: 'all',
    sort: 'newest'
  });

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    const newTags = filters.tags.includes(tag)
      ? filters.tags.filter(t => t !== tag)
      : [...filters.tags, tag];
    handleChange({ tags: newTags });
  };

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
        className="w-full rounded-lg border border-border-color bg-card-background px-4 py-2 text-foreground"
        value={filters.search}
        onChange={(e) => handleChange({ search: e.target.value })}
      />

      <select
        value={filters.model}
        onChange={(e) => handleChange({ model: e.target.value })}
        className="w-full appearance-none rounded-lg border border-border-color bg-card-background px-4 pr-10 py-2 text-foreground"
      >
        <option value="all">All Models</option>
        <option value="gpt-4">GPT-4</option>
        <option value="claude-2">Claude-2</option>
      </select>

      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <button
            key={tag}
            onClick={() => toggleTag(tag)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filters.tags.includes(tag)
                ? "bg-blue-500 text-white"
                : "bg-tag-background text-text-secondary hover:bg-tag-hover"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <select
        value={filters.sort}
        onChange={(e) => handleChange({ sort: e.target.value as FilterState['sort'] })}
        className="w-full appearance-none rounded-lg border border-border-color bg-card-background px-4 pr-10 py-2 text-foreground"
      >
        <option>Newest</option>
        <option>Popular</option>
        <option>Most Forked</option>
      </select>
    </div>
  );
} 