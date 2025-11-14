import { Skeleton } from "@/components/ui/skeleton";
import { getSearch } from "../actions"
import { ResultCardSkeleton } from "./results-cards";
import SearchResultCards from "./search-result-cards";

interface SearchResultsProps {
    term?: string
}

const SearchResults = async ({ term }: SearchResultsProps) => {
    const data = await getSearch(term!);
    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">
                Result for term &quot;{term}&quot;
            </h2>
            {data.length === 0 && (
                <p className="text-muted-foreground text-sm">
                    No result found. Try searching for something else
                </p>
            )}

            <div className="flex flex-col gap-y-4">
                {data.map((result) => (
                    <SearchResultCards data={result} key={result.id} />
                ))}
            </div>
        </div>
    )
}

export const SearchResultsSkeleton = () => {
    return (
        <div>
            <Skeleton className='h-8 w-[290px] mb-4' />
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4'>
                {[...Array(8)].map((_, i) => (
                    <ResultCardSkeleton key={i} />
                ))}
            </div>
        </div>
    )
}

export default SearchResults;