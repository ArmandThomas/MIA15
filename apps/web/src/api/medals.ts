import type { AthleteMedalsAggregateFilters } from "@shared/dto/AthleteMedalsAggregateFilters";
import type { AthleteMedalsAggregate } from "@shared/dto/AthleteMedalsAggregate";
import type { PaginationResponse } from "@shared/dto/PaginationResponse";
import { api } from "./client";
import { type QueryClient, useQuery } from "@tanstack/react-query";

async function fetchMedalsByAthlete(filters: AthleteMedalsAggregateFilters) {
  const response = await api.get<PaginationResponse<AthleteMedalsAggregate>>("/medals/by-athlete", {
    params: filters,
  });

  return response.data;
}

export const useGetMedalsByAthlete = (filters: AthleteMedalsAggregateFilters) => {
  return useQuery({
    queryKey: ["medals/by-athlete", filters],
    queryFn: () => fetchMedalsByAthlete(filters),
  });
};

export const useGetAllMedalsByAthlete = (country?: string) => {
  return useQuery({
    queryKey: ["medals/by-athlete", "all"],
    queryFn: () => fetchMedalsByAthlete({ country }),
  });
};

export const prefetchMedalsByAthlete = (
  queryClient: QueryClient,
  filters: AthleteMedalsAggregateFilters,
) => {
  return queryClient.prefetchQuery({
    queryKey: ["medals/by-athlete", filters],
    queryFn: () => fetchMedalsByAthlete(filters),
  });
};
