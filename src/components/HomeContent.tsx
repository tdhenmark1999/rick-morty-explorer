'use client';

import { useMemo } from 'react';
import { useUrlState, useCharacters, useFavorites } from '@/hooks';
import { SearchControls } from '@/components/SearchControls';
import { CharacterGrid } from '@/components/CharacterGrid';
import { Pagination } from '@/components/Pagination';
import { PaginationInfo } from '@/types';

export function HomeContent() {
  const urlState = useUrlState();
  const { getFavoriteIds } = useFavorites();
  
  const queryParams = useMemo(() => {
    const params: Record<string, string | number> = {
      page: urlState.page,
    };
    
    if (urlState.name) params.name = urlState.name;
    if (urlState.status) params.status = urlState.status;
    if (urlState.species) params.species = urlState.species;
    if (urlState.gender) params.gender = urlState.gender;

    return params;
  }, [urlState.name, urlState.status, urlState.species, urlState.gender, urlState.page]);

  const { data, isLoading, isError, error, refetch } = useCharacters(queryParams);

  const characters = useMemo(() => {
    if (!data?.results) return [];

    let filteredCharacters = [...data.results];

    if (urlState.favorites) {
      const favoriteIds = getFavoriteIds();
      filteredCharacters = filteredCharacters.filter(char => 
        favoriteIds.includes(char.id)
      );
    }

    return filteredCharacters;
  }, [data?.results, urlState.favorites, getFavoriteIds]);

  const paginationInfo: PaginationInfo = {
    currentPage: urlState.page,
    totalPages: data?.info?.pages || 1,
    hasNext: !!data?.info?.next,
    hasPrev: !!data?.info?.prev,
  };

  const handlePageChange = (page: number) => {
    urlState.updateUrl({ page });
  };

  const handleRetry = () => {
    refetch();
  };

  return (
    <div className="space-y-6">
      <SearchControls />
      
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {data && (
            <span>
              {urlState.favorites 
                ? `Showing ${characters.length} favorite character${characters.length !== 1 ? 's' : ''}` 
                : `Showing ${data.results?.length || 0} of ${data.info?.count || 0} characters`}
              {urlState.page > 1 && !urlState.favorites && ` (Page ${urlState.page} of ${data.info?.pages || 1})`}
            </span>
          )}
        </div>
      </div>

      <CharacterGrid
        characters={characters}
        isLoading={isLoading}
        isError={isError}
        error={error || undefined}
        onRetry={handleRetry}
      />

      {data && data.info && data.info.pages > 1 && (
        <Pagination
          pagination={paginationInfo}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}