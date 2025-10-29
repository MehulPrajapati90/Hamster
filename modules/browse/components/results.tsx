import { getStreams } from '../actions'
import ResultsCards, { ResultCardSkeleton } from './results-cards';
import { Skeleton } from '@/components/ui/skeleton';

const BrowseResults = async () => {
    const data = await getStreams();
    console.log(data);
    return (
        <div>
            <h2 className='text-lg font-semibold mb-4'>
                Stream we think you&apos;ll like
            </h2>
            {data.length === 0 && (
                <div className='text-muted-foreground text-sm'>
                    No Stream found
                </div>
            )}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4'>
                {data.map((results) => (
                    <ResultsCards
                        key={results.id}
                        data={results}
                    />
                ))}
            </div>
        </div>
    )
}


export const BrowseResultSkeleton = () => {
    return (
        <div>
            <Skeleton className='h-8 w-[290px] mb-4' />
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4'>
                {[...Array(4)].map((_,i)=>(
                    <ResultCardSkeleton key={i} />
                ))}
            </div>
        </div>
    )
}

export default BrowseResults;