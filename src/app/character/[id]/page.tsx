'use client';

import { useParams } from 'next/navigation';
import { useCharacterDetail } from '@/hooks';
import { CharacterDetail } from '@/components/CharacterDetail';
import { CharacterDetailSkeleton } from '@/components/Loading';
import { ErrorState } from '@/components/ErrorState';

export const dynamic = 'force-dynamic';

export default function CharacterPage() {
  const params = useParams();
  const characterId = parseInt(params.id as string, 10);

  const { data: character, isLoading, isError, error, refetch } = useCharacterDetail(characterId);

  if (isLoading) {
    return <CharacterDetailSkeleton />;
  }

  if (isError || !character) {
    const errorMessage = error?.message || 'Character not found';
    const isCancelled = errorMessage.includes('cancelled') || errorMessage.includes('aborted') || errorMessage === 'Request was cancelled';
    const isNotFound = errorMessage.includes('404') || errorMessage.includes('not found');
    
    if (isCancelled) {
      return <CharacterDetailSkeleton />;
    }
    
    return (
      <ErrorState
        title={isNotFound ? 'Character Not Found' : 'Error Loading Character'}
        message={isNotFound ? 'The character you\'re looking for doesn\'t exist or has been removed.' : errorMessage}
        onRetry={isNotFound ? undefined : () => refetch()}
        showRetry={!isNotFound}
      />
    );
  }

  return <CharacterDetail character={character} />;
}