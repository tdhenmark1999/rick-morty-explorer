import { useCallback, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { UrlState } from '@/types';
import { DEFAULT_URL_STATE, URL_PARAMS } from '@/constants';

export function useUrlState() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentState = useMemo((): UrlState => {
    return {
      page: parseInt(searchParams.get(URL_PARAMS.PAGE) || '1', 10),
      name: searchParams.get(URL_PARAMS.NAME) || '',
      status: searchParams.get(URL_PARAMS.STATUS) || '',
      species: searchParams.get(URL_PARAMS.SPECIES) || '',
      gender: searchParams.get(URL_PARAMS.GENDER) || '',
      sort: searchParams.get(URL_PARAMS.SORT) || DEFAULT_URL_STATE.sort,
      order: searchParams.get(URL_PARAMS.ORDER) || DEFAULT_URL_STATE.order,
      favorites: searchParams.get(URL_PARAMS.FAVORITES) === 'true',
    };
  }, [searchParams]);

  const updateUrl = useCallback((updates: Partial<UrlState>) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (Object.keys(updates).some(key => key !== 'page') && !updates.page) {
      updates.page = 1;
    }

    Object.entries(updates).forEach(([key, value]) => {
      if (value === undefined || value === null || value === '') {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });

    if (params.get('page') === '1') params.delete('page');
    if (params.get('sort') === DEFAULT_URL_STATE.sort) params.delete('sort');
    if (params.get('order') === DEFAULT_URL_STATE.order) params.delete('order');
    if (params.get('favorites') === 'false') params.delete('favorites');

    const newUrl = params.toString() ? `?${params.toString()}` : '';
    router.push(`/${newUrl}`, { scroll: false });
  }, [router, searchParams]);

  const resetFilters = useCallback(() => {
    router.push('/', { scroll: false });
  }, [router]);

  return {
    ...currentState,
    updateUrl,
    resetFilters,
  };
}