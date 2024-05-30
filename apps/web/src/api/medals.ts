import type { AthleteMedalsAggregateFilters } from "@shared/dto/AthleteMedalsAggregateFilters";
import type { AthleteMedalsAggregate } from "@shared/dto/AthleteMedalsAggregate";
import type { PaginationResponse } from "@shared/dto/PaginationResponse";
import { api } from "./client";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useGetMedalsByAthlete = (filters: AthleteMedalsAggregateFilters) => {
  return useInfiniteQuery({
    queryKey: ["medals", "by-athlete", filters],
    queryFn: async ({ pageParam }) => {
      const response = await api.get<PaginationResponse<AthleteMedalsAggregate>>(
        "/medals/by-athlete",
        { params: { ...filters, page: pageParam } },
      );

      return response.data;
    },
    initialPageParam: 1,
    getPreviousPageParam: (firstPage) => {
      return firstPage.hasPrevPage ? firstPage.prevPage : undefined;
    },
    getNextPageParam: (lastPage) => {
      return lastPage.hasNextPage ? lastPage.nextPage : undefined;
    },
  });
};
