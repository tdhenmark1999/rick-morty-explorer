export interface Character {
  id: number;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  type: string;
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown';
  origin: Location;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface Location {
  name: string;
  url: string;
}

export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

export interface ApiResponse<T> {
  info: ApiInfo;
  results: T[];
}

export interface ApiInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface CharacterFilters {
  name?: string;
  status?: Character['status'] | '';
  species?: string;
  type?: string;
  gender?: Character['gender'] | '';
}

export interface SearchParams extends CharacterFilters {
  page?: number;
  sort?: 'name' | 'created' | 'id';
  order?: 'asc' | 'desc';
}

export interface FavoritesState {
  [characterId: string]: boolean;
}

export interface AppError {
  message: string;
  status?: number;
  type: 'network' | 'not_found' | 'server' | 'unknown';
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export type Theme = 'light' | 'dark';

export type LoadingState = 'idle' | 'loading' | 'error' | 'success';

export interface UrlState {
  page: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  sort: string;
  order: string;
  favorites?: boolean;
}