'use client';

import { useMemo } from 'react';
import { useUrlState, useCharacters, useFavorites } from '@/hooks';
import { SearchControls } from '@/components/SearchControls';
import { CharacterGrid } from '@/components/CharacterGrid';
import { Pagination } from '@/components/Pagination';
import { PaginationInfo } from '@/types';

export default function Home() {
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
    if (urlState.sort) params.sort = urlState.sort;
    if (urlState.order) params.order = urlState.order;
    
    return params;
  }, [urlState]);

  const { data, isLoading, isError, error, refetch } = useCharacters(queryParams);

  const paginationInfo: PaginationInfo = useMemo(() => {
    if (!data?.info) {
      return {
        currentPage: urlState.page,
        totalPages: 1,
        hasNext: false,
        hasPrev: false,
      };
    }

    return {
      currentPage: urlState.page,
      totalPages: data.info.pages,
      hasNext: !!data.info.next,
      hasPrev: !!data.info.prev,
    };
  }, [data?.info, urlState.page]);

  const handlePageChange = (page: number) => {
    urlState.updateUrl({ page });
  };

  const handleRetry = () => {
    refetch();
  };

  const characters = useMemo(() => {
    if (!data?.results) return [];
    
    if (urlState.favorites) {
      const favoriteIds = getFavoriteIds();
      return data.results.filter(character => favoriteIds.includes(character.id));
    }
    
    return data.results;
  }, [data?.results, urlState.favorites, getFavoriteIds]);

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
