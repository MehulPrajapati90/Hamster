import BrowseResults, { BrowseResultSkeleton } from '@/modules/browse/components/results';
import { Suspense } from 'react';

const Home = () => {
  return (
    <div className='h-full p-8 max-w-screen-2xl mx-auto'>
      <Suspense fallback={<BrowseResultSkeleton />}>
        <BrowseResults />
      </Suspense>
    </div>
  )
}

export default Home;