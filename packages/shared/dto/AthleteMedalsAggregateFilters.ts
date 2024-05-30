import type { PaginationFilters } from "./PaginationFilters.ts";

export interface AthleteMedalsAggregateFilters extends PaginationFilters {
  country?: string;
}
