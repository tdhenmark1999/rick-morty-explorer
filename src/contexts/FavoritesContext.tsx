'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { FavoritesState } from '@/types';
import { STORAGE_KEYS } from '@/constants';

interface FavoritesContextType {
  favorites: FavoritesState;
  toggleFavorite: (characterId: number) => void;
  isFavorite: (characterId: number) => boolean;
  getFavoriteIds: () => number[];
  clearFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<FavoritesState>({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (error) {
      console.warn('Failed to load favorites from localStorage:', error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    
    try {
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));

      
      window.dispatchEvent(new CustomEvent('favorites-updated', { detail: favorites }));
    } catch (error) {
      console.warn('Failed to save favorites to localStorage:', error);
    }
  }, [favorites, isLoaded]);

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEYS.FAVORITES && e.newValue) {
        try {
          setFavorites(JSON.parse(e.newValue));
        } catch (error) {
          console.warn('Failed to parse favorites from storage event:', error);
        }
      }
    };

    const handleFavoritesUpdate = (e: CustomEvent) => {
      setFavorites(e.detail);
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('favorites-updated', handleFavoritesUpdate as EventListener);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('favorites-updated', handleFavoritesUpdate as EventListener);
    };
  }, []);

  const toggleFavorite = useCallback((characterId: number) => {
    setFavorites(prev => {
      const newFavorites: FavoritesState = {
        ...prev,
        [characterId]: !prev[characterId]
      };

      
      if (!newFavorites[characterId]) {
        delete newFavorites[characterId];
      }
      
      return newFavorites;
    });
  }, []);

  const isFavorite = useCallback((characterId: number) => {
    return !!favorites[characterId];
  }, [favorites]);

  const getFavoriteIds = useCallback(() => {
    return Object.keys(favorites)
      .filter(id => favorites[id])
      .map(id => parseInt(id, 10));
  }, [favorites]);

  const clearFavorites = useCallback(() => {
    setFavorites({});
  }, []);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
        getFavoriteIds,
        clearFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavoritesContext() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavoritesContext must be used within a FavoritesProvider');
  }
  return context;
}