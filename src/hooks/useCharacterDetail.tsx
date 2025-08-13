import { useQuery } from '@tanstack/react-query';
import { fetchCharacterById } from '@/utils/api';

export function useCharacterDetail(id: number) {
  return useQuery({
    queryKey: ['character', id],
    queryFn: async ({ signal }) => {
      return fetchCharacterById(id, signal);
    },
    enabled: !!id && id > 0,
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: (failureCount, error) => {
      if (error instanceof Error && (error.message.includes('cancelled') || error.message.includes('aborted'))) {
        return false;
      }
      if (error instanceof Error && error.message.includes('404')) {
        return false;
      }
      return failureCount < 2;
    },
  });
}