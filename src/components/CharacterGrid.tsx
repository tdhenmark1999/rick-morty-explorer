import { Character } from '@/types';
import { CharacterCard } from './CharacterCard';
import { CharacterGridSkeleton } from './Loading';
import { ErrorState, NotFoundState } from './ErrorState';

interface CharacterGridProps {
  characters: Character[];
  isLoading: boolean;
  isError: boolean;
  error?: Error;
  onRetry?: () => void;
}

export function CharacterGrid({ 
  characters, 
  isLoading, 
  isError, 
  error,
  onRetry 
}: CharacterGridProps) {
  if (isLoading) {
    return <CharacterGridSkeleton />;
  }

  if (isError && error) {
    const isNotFound = error.message.includes('404') || error.message.includes('No characters found');
    
    if (isNotFound) {
      return <NotFoundState />;
    }
    
    return (
      <ErrorState 
        message={error.message} 
        onRetry={onRetry}
      />
    );
  }

  if (!characters.length) {
    return <NotFoundState message="No characters to display." />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {characters.map((character) => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </div>
  );
}