'use client';

import { useState, useEffect } from 'react';
import { MindCard } from '@/components/MindCard';
import { MindsFilter, FilterState } from '@/components/MindsFilter';
import { Mind } from '@/types/mind';
import { Pagination } from '@/components/Pagination';

export default function MindsPage() {
  const [minds, setMinds] = useState<Mind[]>([]);
  const [filteredMinds, setFilteredMinds] = useState<Mind[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 12;

  useEffect(() => {
    fetchMinds();
  }, []);

  const fetchMinds = async () => {
    try {
      const response = await fetch('/api/minds');
      const data = await response.json();
      setMinds(data);
      setFilteredMinds(data);
    } catch (error) {
      console.error('Error fetching minds:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (filters: FilterState) => {
    let filtered = [...minds];

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        mind =>
          mind.name.toLowerCase().includes(searchLower) ||
          mind.description.toLowerCase().includes(searchLower)
      );
    }

    // Apply model filter
    if (filters.model) {
      filtered = filtered.filter(mind => mind.model.name === filters.model);
    }

    // Apply tags filter
    if (filters.tags.length > 0) {
      filtered = filtered.filter(mind =>
        filters.tags.every(tag => mind.metadata.tags.includes(tag))
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (filters.sort) {
        case 'newest':
          return new Date(b.metadata.created).getTime() - new Date(a.metadata.created).getTime();
        case 'popular':
          // TODO: Implement popularity sorting when we have usage statistics
          return 0;
        case 'forked':
          // TODO: Implement fork counting when we have that data
          return 0;
        default:
          return 0;
      }
    });

    setFilteredMinds(filtered);
  };

  // Extract unique tags and models for filters
  const allTags = Array.from(new Set(minds.flatMap(mind => mind.metadata.tags)));
  const allModels = Array.from(new Set(minds.map(mind => mind.model.name)));

  // Update the rendering logic to use pagination
  const paginatedMinds = filteredMinds.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(filteredMinds.length / ITEMS_PER_PAGE);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-medium text-gray-400">Explore Minds</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <aside className="lg:col-span-1">
          <MindsFilter
            tags={allTags}
            models={allModels}
            onFilterChange={handleFilterChange}
          />
        </aside>

        <main className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {paginatedMinds.map(mind => (
              <MindCard key={mind.id} mind={mind} />
            ))}
          </div>

          {filteredMinds.length > ITEMS_PER_PAGE && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
          
          {filteredMinds.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No minds found matching your criteria
            </div>
          )}
        </main>
      </div>
    </div>
  );
} 