'use client';

import { Heart } from 'lucide-react';
import { useState } from 'react';
import { useFavorites } from '@/hooks';

interface FavoriteButtonProps {
  characterId: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

const sizeClasses = {
  sm: 'w-6 h-6 p-1',
  md: 'w-8 h-8 p-1.5',
  lg: 'w-10 h-10 p-2',
};

const iconSizes = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
};

export function FavoriteButton({ 
  characterId, 
  size = 'md',
  showLabel = false 
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const [isAnimating, setIsAnimating] = useState(false);
  const [optimisticFavorite, setOptimisticFavorite] = useState<boolean | null>(null);
  const favorite = optimisticFavorite !== null ? optimisticFavorite : isFavorite(characterId);

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newFavoriteState = !favorite;
    setOptimisticFavorite(newFavoriteState);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 200);
    try {
      toggleFavorite(characterId);
      setTimeout(() => setOptimisticFavorite(null), 100);
    } catch (error) {
      setOptimisticFavorite(!newFavoriteState);
      console.error('Failed to toggle favorite:', error);
    }
  };

  return (
    <button
      onClick={handleToggle}
      className={`
        ${sizeClasses[size]} 
        rounded-full transition-all duration-200 
        hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
        ${isAnimating ? 'animate-bounce' : ''}
        ${favorite 
          ? 'bg-red-500 text-white hover:bg-red-600 shadow-lg' 
          : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-600 hover:text-red-500'
        }
      `}
      title={favorite ? 'Remove from favorites' : 'Add to favorites'}
      aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Heart 
        className={`${iconSizes[size]} transition-all duration-200 ${favorite ? 'fill-current scale-110' : ''}`} 
      />
      {showLabel && (
        <span className="ml-2 text-sm">
          {favorite ? 'Favorited' : 'Add to Favorites'}
        </span>
      )}
    </button>
  );
}