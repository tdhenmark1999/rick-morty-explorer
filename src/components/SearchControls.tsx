'use client';

import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useUrlState, useDebounce } from '@/hooks';
import { CHARACTER_STATUS_OPTIONS, CHARACTER_GENDER_OPTIONS, SORT_OPTIONS, APP_CONFIG } from '@/constants';

export function SearchControls() {
  const urlState = useUrlState();
  const [searchValue, setSearchValue] = useState(urlState.name);
  const debouncedSearch = useDebounce(searchValue, APP_CONFIG.DEBOUNCE_DELAY);

  useEffect(() => {
    if (debouncedSearch !== urlState.name) {
      urlState.updateUrl({ name: debouncedSearch });
    }
  }, [debouncedSearch, urlState]);

  useEffect(() => {
    setSearchValue(urlState.name);
  }, [urlState.name]);

  const handleClearFilters = () => {
    setSearchValue('');
    urlState.resetFilters();
  };

  const hasActiveFilters = urlState.name || urlState.status || urlState.gender || urlState.species;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-2">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Search Characters
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
            <input
              id="search"
              type="text"
              placeholder="Search by name..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Status
          </label>
          <select
            id="status"
            value={urlState.status}
            onChange={(e) => urlState.updateUrl({ status: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {CHARACTER_STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Gender
          </label>
          <select
            id="gender"
            value={urlState.gender}
            onChange={(e) => urlState.updateUrl({ gender: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {CHARACTER_GENDER_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div>
          <label htmlFor="species" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Species
          </label>
          <input
            id="species"
            type="text"
            placeholder="e.g., Human, Alien..."
            value={urlState.species}
            onChange={(e) => urlState.updateUrl({ species: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="sort" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Sort By
          </label>
          <select
            id="sort"
            value={urlState.sort}
            onChange={(e) => urlState.updateUrl({ sort: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
          {hasActiveFilters && (
            <button
              onClick={handleClearFilters}
              className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-200 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors flex items-center justify-center"
            >
              <X className="w-4 h-4 mr-2" />
              Clear Filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
}