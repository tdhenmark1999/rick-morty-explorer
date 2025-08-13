import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, MapPin, Calendar } from 'lucide-react';
import { Character } from '@/types';
import { STATUS_COLORS } from '@/constants';
import { FavoriteButton } from './FavoriteButton';
import { CharacterNotes } from './CharacterNotes';

interface CharacterDetailProps {
  character: Character;
}

export function CharacterDetail({ character }: CharacterDetailProps) {
  const statusColors = STATUS_COLORS[character.status.toLowerCase() as keyof typeof STATUS_COLORS];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Characters
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2 relative">
            <Image
              src={character.image}
              alt={character.name}
              width={500}
              height={500}
              className="w-full h-96 md:h-full object-cover"
              priority
            />
            <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-medium ${statusColors.bg} ${statusColors.text} ${statusColors.border} border`}>
              <div className={`inline-block w-3 h-3 rounded-full mr-2 ${statusColors.dot}`} />
              {character.status}
            </div>

            <div className="absolute top-4 right-4">
              <FavoriteButton characterId={character.id} size="lg" />
            </div>
          </div>

          <div className="md:w-1/2 p-8">
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{character.name}</h1>
                <div className="flex flex-wrap gap-2 text-sm">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md font-medium">
                    {character.species}
                  </span>
                  {character.type && (
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-md font-medium">
                      {character.type}
                    </span>
                  )}
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-md font-medium">
                    {character.gender}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Origin</p>
                    <p className="text-sm text-gray-600">{character.origin.name}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Last Known Location</p>
                    <p className="text-sm text-gray-600">{character.location.name}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Episodes</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-2xl font-bold text-blue-600">{character.episode.length}</span>
                    <span className="text-sm text-gray-600">episodes appeared in</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    Episodes {character.episode.slice(0, 5).map(url => {
                      const match = url.match(/\/episode\/(\d+)$/);
                      return match ? match[1] : '';
                    }).filter(Boolean).join(', ')}
                    {character.episode.length > 5 && ` and ${character.episode.length - 5} more`}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>Added on {formatDate(character.created)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CharacterNotes characterId={character.id} characterName={character.name} />
    </div>
  );
}