import { ClientWrapper } from '@/components/ClientWrapper';
import { HomeContent } from '@/components/HomeContent';

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <ClientWrapper fallback={<div className="flex justify-center items-center h-64">Loading...</div>}>
      <HomeContent />
    </ClientWrapper>
  );
}