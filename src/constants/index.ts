export const API_CONFIG = {
  BASE_URL: 'https://rickandmortyapi.com/api',
  ENDPOINTS: {
    CHARACTERS: '/character',
    EPISODES: '/episode',
    LOCATIONS: '/location',
  },
} as const;

export const APP_CONFIG = {
  DEBOUNCE_DELAY: 400,
  DEFAULT_PAGE_SIZE: 20,
  MAX_FAVORITES: 100,
} as const;

export const STORAGE_KEYS = {
  FAVORITES: 'rick-morty-favorites',
  THEME: 'rick-morty-theme',
  PREFERENCES: 'rick-morty-preferences',
} as const;

export const CHARACTER_STATUS_OPTIONS = [
  { value: '', label: 'All Status' },
  { value: 'alive', label: 'Alive' },
  { value: 'dead', label: 'Dead' },
  { value: 'unknown', label: 'Unknown' },
] as const;

export const CHARACTER_GENDER_OPTIONS = [
  { value: '', label: 'All Genders' },
  { value: 'female', label: 'Female' },
  { value: 'male', label: 'Male' },
  { value: 'genderless', label: 'Genderless' },
  { value: 'unknown', label: 'Unknown' },
] as const;

export const SORT_OPTIONS = [
  { value: 'id', label: 'Default' },
  { value: 'name', label: 'Name' },
  { value: 'created', label: 'Created Date' },
] as const;

export const ORDER_OPTIONS = [
  { value: 'asc', label: 'Ascending' },
  { value: 'desc', label: 'Descending' },
] as const;

export const POPULAR_SPECIES = [
  'Human',
  'Alien',
  'Robot',
  'Animal',
  'Disease',
  'Cronenberg',
  'Mytholog',
  'Humanoid',
] as const;

export const URL_PARAMS = {
  PAGE: 'page',
  NAME: 'name',
  STATUS: 'status',
  SPECIES: 'species',
  TYPE: 'type',
  GENDER: 'gender',
  SORT: 'sort',
  ORDER: 'order',
  FAVORITES: 'favorites',
} as const;

export const DEFAULT_URL_STATE = {
  page: 1,
  name: '',
  status: '',
  species: '',
  gender: '',
  sort: 'id',
  order: 'asc',
  favorites: false,
} as const;

export const THEME_CONFIG = {
  DEFAULT: 'light' as const,
  STORAGE_KEY: STORAGE_KEYS.THEME,
  CSS_VARIABLE: '--theme',
} as const;

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection and try again.',
  NOT_FOUND: 'No characters found matching your criteria.',
  SERVER_ERROR: 'Server error. Please try again later.',
  UNKNOWN_ERROR: 'An unexpected error occurred.',
  CHARACTER_NOT_FOUND: 'Character not found.',
  INVALID_CHARACTER_ID: 'Invalid character ID.',
} as const;

export const SUCCESS_MESSAGES = {
  FAVORITE_ADDED: 'Added to favorites!',
  FAVORITE_REMOVED: 'Removed from favorites.',
  THEME_CHANGED: 'Theme updated successfully.',
} as const;

export const ANIMATION_DURATIONS = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
} as const;

export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;

export const STATUS_COLORS = {
  alive: {
    bg: 'bg-green-100',
    text: 'text-green-800',
    border: 'border-green-200',
    dot: 'bg-green-500',
  },
  dead: {
    bg: 'bg-red-100',
    text: 'text-red-800',
    border: 'border-red-200',
    dot: 'bg-red-500',
  },
  unknown: {
    bg: 'bg-gray-100',
    text: 'text-gray-800',
    border: 'border-gray-200',
    dot: 'bg-gray-500',
  },
} as const;

export const APP_METADATA = {
  NAME: 'Rick & Morty Character Explorer',
  DESCRIPTION: 'Explore characters from the Rick and Morty universe',
  VERSION: '1.0.0',
  AUTHOR: 'Rick & Morty Explorer Team',
} as const;