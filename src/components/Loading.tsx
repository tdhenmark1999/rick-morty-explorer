interface LoadingSkeletonProps {
  className?: string;
}

function LoadingSkeleton({ className = '' }: LoadingSkeletonProps) {
  return (
    <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
  );
}

export function CharacterCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <LoadingSkeleton className="w-full h-64" />
      <div className="p-4 space-y-3">
        <LoadingSkeleton className="h-6 w-3/4" />
        <LoadingSkeleton className="h-4 w-1/2" />
        <LoadingSkeleton className="h-4 w-2/3" />
        <div className="flex justify-between items-center pt-2">
          <LoadingSkeleton className="h-6 w-16" />
          <LoadingSkeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function CharacterGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 20 }, (_, i) => (
        <CharacterCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function CharacterDetailSkeleton() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <LoadingSkeleton className="w-full md:w-1/2 h-96" />
          <div className="p-8 md:w-1/2 space-y-4">
            <LoadingSkeleton className="h-8 w-3/4" />
            <LoadingSkeleton className="h-6 w-1/2" />
            <LoadingSkeleton className="h-4 w-full" />
            <LoadingSkeleton className="h-4 w-2/3" />
            <LoadingSkeleton className="h-4 w-1/2" />
            <div className="space-y-2 pt-4">
              <LoadingSkeleton className="h-4 w-full" />
              <LoadingSkeleton className="h-4 w-full" />
              <LoadingSkeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}