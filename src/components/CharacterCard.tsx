import Link from 'next/link';
import Image from 'next/image';
import { Character } from '@/types';
import { STATUS_COLORS } from '@/constants';
import { FavoriteButton } from './FavoriteButton';

interface CharacterCardProps {
  character: Character;
}

export function CharacterCard({ character }: CharacterCardProps) {
  const statusColors = STATUS_COLORS[character.status.toLowerCase() as keyof typeof STATUS_COLORS];

  return (
    <Link 
      href={`/character/${character.id}`} 
      className="group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg"
      aria-label={`View details for ${character.name}`}
    >
      <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 group-hover:scale-[1.02] transform focus-within:ring-2 focus-within:ring-blue-500 h-full flex flex-col">
        <div className="relative">
          <Image
            src={character.image}
            alt={`Portrait of ${character.name}, a ${character.species}`}
            width={300}
            height={300}
            className="w-full h-64 object-cover"
            priority
          />
          <div className="absolute top-2 right-2">
            <FavoriteButton characterId={character.id} size="md" />
          </div>
          <div 
            className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium ${statusColors.bg} ${statusColors.text} ${statusColors.border} border`}
            role="status"
            aria-label={`Status: ${character.status}`}
          >
            <div 
              className={`inline-block w-2 h-2 rounded-full mr-1 ${statusColors.dot}`} 
              aria-hidden="true"
            />
            {character.status}
          </div>
        </div>
        
        <div className="p-4 flex-1 flex flex-col">
          <div className="flex-1">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
              {character.name}
            </h3>
            
            <dl className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
              <div>
                <dt className="font-medium inline">Species:</dt>
                <dd className="inline ml-1">{character.species}</dd>
              </div>
              {character.type && (
                <div>
                  <dt className="font-medium inline">Type:</dt>
                  <dd className="inline ml-1">{character.type}</dd>
                </div>
              )}
              <div>
                <dt className="font-medium inline">Gender:</dt>
                <dd className="inline ml-1">{character.gender}</dd>
              </div>
              <div>
                <dt className="font-medium inline">Origin:</dt>
                <dd className="inline ml-1">{character.origin.name}</dd>
              </div>
            </dl>
          </div>
          
          <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Appears in {character.episode.length} episode{character.episode.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </article>
    </Link>
  );
}