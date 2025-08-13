import { 
  Character, 
  Episode, 
  ApiResponse, 
  CharacterFilters, 
  AppError 
} from '@/types';

const BASE_URL = 'https://rickandmortyapi.com/api';

class ApiError extends Error {
  status: number;
  type: AppError['type'];

  constructor(message: string, status: number, type: AppError['type'] = 'unknown') {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.type = type;
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let errorType: AppError['type'] = 'unknown';
    let message = 'An error occurred';

    switch (response.status) {
      case 404:
        errorType = 'not_found';
        message = 'No characters found matching your criteria';
        break;
      case 500:
      case 502:
      case 503:
        errorType = 'server';
        message = 'Server error. Please try again later.';
        break;
      default:
        errorType = 'network';
        message = `Request failed with status ${response.status}`;
    }

    throw new ApiError(message, response.status, errorType);
  }

  try {
    return await response.json();
  } catch {
    throw new ApiError('Failed to parse response', 500, 'server');
  }
}

function buildQueryString(params: Record<string, string | number>): string {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, String(value));
    }
  });

  return searchParams.toString();
}

export async function fetchCharacters(
  filters: CharacterFilters & { page?: number; sort?: string; order?: string } = {},
  signal?: AbortSignal
): Promise<ApiResponse<Character>> {
  try {
    const { sort, order, ...apiFilters } = filters;
    const queryString = buildQueryString(apiFilters);
    const url = `${BASE_URL}/character${queryString ? `?${queryString}` : ''}`;
    
    const response = await fetch(url, {
      signal,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await handleResponse<ApiResponse<Character>>(response);
    if (sort && data.results) {
      data.results = sortCharacters(data.results, sort, order || 'asc');
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new ApiError('Request was cancelled', 0, 'network');
    }

    throw new ApiError(
      error instanceof Error ? error.message : 'Network error occurred',
      0,
      'network'
    );
  }
}

function sortCharacters(characters: Character[], sortBy: string, order: string): Character[] {
  return [...characters].sort((a, b) => {
    let aValue: string | number;
    let bValue: string | number;

    switch (sortBy) {
      case 'name':
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
        break;
      case 'created':
        aValue = new Date(a.created).getTime();
        bValue = new Date(b.created).getTime();
        break;
      case 'id':
      default:
        aValue = a.id;
        bValue = b.id;
        break;
    }

    if (aValue < bValue) return order === 'asc' ? -1 : 1;
    if (aValue > bValue) return order === 'asc' ? 1 : -1;
    return 0;
  });
}

export async function fetchCharacterById(
  id: number,
  signal?: AbortSignal
): Promise<Character> {
  try {
    const response = await fetch(`${BASE_URL}/character/${id}`, {
      signal,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return handleResponse<Character>(response);
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new ApiError('Request was cancelled', 0, 'network');
    }

    throw new ApiError(
      error instanceof Error ? error.message : 'Network error occurred',
      0,
      'network'
    );
  }
}

export async function fetchMultipleCharacters(
  ids: number[],
  signal?: AbortSignal
): Promise<Character[]> {
  if (ids.length === 0) return [];
  
  try {
    const idsString = ids.join(',');
    const response = await fetch(`${BASE_URL}/character/${idsString}`, {
      signal,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await handleResponse<Character | Character[]>(response);
    
    return Array.isArray(data) ? data : [data];
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new ApiError('Request was cancelled', 0, 'network');
    }

    throw new ApiError(
      error instanceof Error ? error.message : 'Network error occurred',
      0,
      'network'
    );
  }
}

export async function fetchEpisodeById(
  id: number,
  signal?: AbortSignal
): Promise<Episode> {
  try {
    const response = await fetch(`${BASE_URL}/episode/${id}`, {
      signal,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return handleResponse<Episode>(response);
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new ApiError('Request was cancelled', 0, 'network');
    }

    throw new ApiError(
      error instanceof Error ? error.message : 'Network error occurred',
      0,
      'network'
    );
  }
}

export async function fetchMultipleEpisodes(
  ids: number[],
  signal?: AbortSignal
): Promise<Episode[]> {
  if (ids.length === 0) return [];
  
  try {
    const idsString = ids.join(',');
    const response = await fetch(`${BASE_URL}/episode/${idsString}`, {
      signal,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await handleResponse<Episode | Episode[]>(response);
    
    return Array.isArray(data) ? data : [data];
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new ApiError('Request was cancelled', 0, 'network');
    }

    throw new ApiError(
      error instanceof Error ? error.message : 'Network error occurred',
      0,
      'network'
    );
  }
}

export function extractEpisodeIds(episodeUrls: string[]): number[] {
  return episodeUrls
    .map(url => {
      const match = url.match(/\/episode\/(\d+)$/);
      return match ? parseInt(match[1], 10) : null;
    })
    .filter((id): id is number => id !== null);
}

export function extractCharacterId(characterUrl: string): number | null {
  const match = characterUrl.match(/\/character\/(\d+)$/);
  return match ? parseInt(match[1], 10) : null;
}

export { ApiError };