import type { AthleteMedalsAggregateFilters } from "@shared/dto/AthleteMedalsAggregateFilters";
import { useState } from "react";
import { useGetMedalsByAthlete, prefetchMedalsByAthlete } from "@/api/medals";
import { AthleteMedalsTable } from "./AthleteMedalsTable";
import { AthleteMedalsTableSkeleton } from "./AthleteMedalsTableSkeleton";
import { AthleteMedalsToolbar } from "./AthleteMedalsToolbar";
import { AthleteMedalsPagination } from "./AthleteMedalsPagination";
import { useQueryClient } from "@tanstack/react-query";

const defaultFilters: AthleteMedalsAggregateFilters = {
  count: 10,
  page: 1,
};

export function AthleteMedals() {
  const [filters, setFilters] = useState<AthleteMedalsAggregateFilters>(defaultFilters);
  const medalsQuery = useGetMedalsByAthlete(filters);
  const queryClient = useQueryClient();

  const onPageChange = (page: number) => {
    setFilters((prevFilters) => ({ ...prevFilters, page }));
  };

  const onPageHover = (page: number) => {
    prefetchMedalsByAthlete(queryClient, { ...filters, page });
  };

  return (
    <div className="space-y-4">
      <AthleteMedalsToolbar />
      {medalsQuery.data ? (
        <>
          <AthleteMedalsTable medals={medalsQuery.data.data} />
          <AthleteMedalsPagination
            className="mt-4 justify-end"
            totalPages={medalsQuery.data.totalPages}
            currentPage={filters.page}
            onPageChange={onPageChange}
            onPageHover={onPageHover}
          />
        </>
      ) : (
        <AthleteMedalsTableSkeleton rows={filters.count} />
      )}
    </div>
  );
}
