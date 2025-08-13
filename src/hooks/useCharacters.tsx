import { useQuery } from '@tanstack/react-query';
import { fetchCharacters } from '@/utils/api';
import { CharacterFilters } from '@/types';

interface UseCharactersParams extends CharacterFilters {
  page?: number;
}

export function useCharacters(params: UseCharactersParams = {}) {
  return useQuery({
    queryKey: ['characters', params],
    queryFn: async ({ signal }) => {
      return fetchCharacters(params, signal);
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: (failureCount, error) => {
      if (error instanceof Error && (error.message.includes('cancelled') || error.message.includes('aborted'))) {
        return false;
      }
      return failureCount < 3;
    },
  });
}