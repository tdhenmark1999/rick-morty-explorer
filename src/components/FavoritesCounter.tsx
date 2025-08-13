'use client';

import { Heart } from 'lucide-react';
import { useFavorites } from '@/hooks';
import { useUrlState } from '@/hooks';

export function FavoritesCounter() {
  const { getFavoriteIds } = useFavorites();
  const urlState = useUrlState();
  const favoriteCount = getFavoriteIds().length;

  if (favoriteCount === 0) return null;

  const handleClick = () => {
    urlState.updateUrl({ favorites: !urlState.favorites, page: 1 });
  };

  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium hover:scale-105 transform transition-transform ${
        urlState.favorites
          ? 'bg-red-600 text-white shadow-lg'
          : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
      }`}
      title={urlState.favorites ? 'Show all characters' : 'Show only favorites'}
    >
      <Heart className="w-4 h-4 mr-1 fill-current" />
      <span>{favoriteCount} Favorite{favoriteCount !== 1 ? 's' : ''}</span>
    </button>
  );
}