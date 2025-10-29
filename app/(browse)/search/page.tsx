import SearchResults, { SearchResultsSkeleton } from "@/modules/browse/components/search-results";
import { redirect } from "next/navigation";
import { Suspense } from "react";

interface SearchPageProps {
    searchParams: Promise<{ term?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const {term} = await searchParams;

    if (!term) {
        redirect("/");
    }

    return (
        <div className="h-full p-8 max-w-screen-2xl mx-auto">
            <Suspense fallback={<SearchResultsSkeleton />}>
                <SearchResults term={term} />
            </Suspense>
        </div>
    );
};