"use client";

import { Suspense } from "react";
import SearchFilters from "./search-filters";

const SearchFiltersClient = () => {
    return (
        <Suspense fallback={<div>Loading filters...</div>}>
            <SearchFilters />
        </Suspense>
    );
};

export default SearchFiltersClient;
