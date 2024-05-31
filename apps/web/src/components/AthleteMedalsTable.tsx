import type { AthleteMedalsAggregateFilters } from "@shared/dto/AthleteMedalsAggregateFilters";
import type { AthleteMedalsAggregate } from "@shared/dto/AthleteMedalsAggregate";
import { useState } from "react";
import { useGetMedalsByAthlete } from "@/api/medals";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRoot,
  TableRow,
} from "@/components/ui/Table";
import { DynamicPagination } from "./DynamicPagination";

import { Button } from "@/components/ui/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Skeleton } from "./ui/Skeleton";

function AthleteMedalsToolbar() {
  const [value, setValue] = useState("");
  const data = [
    {
      value: "chocolate",
      label: "🍫  Schoggi (Swiss german for 'Chocolate')",
    },
    {
      value: "cheese",
      label: "🧀  Chäs (Swiss german for 'Cheese')",
    },
    {
      value: "fondue",
      label: "🫕  Fondü (Swiss german for 'Fondue')",
    },
    {
      value: "Milk",
      label: "🥛  Melch (Swiss german for 'Milk')",
    },
  ];

  return (
    <div className="flex flex-1 gap-2">
      <div className="min-w-36">
        <Select value={value} onValueChange={setValue}>
          <SelectTrigger className="mx-auto h-10">
            <SelectValue placeholder="Select" aria-label={value} />
          </SelectTrigger>
          <SelectContent>
            {data.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                <span className="flex items-center gap-x-2">{item.label}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button className="h-10 whitespace-nowrap" variant="secondary" onClick={() => setValue("")}>
        Reset selection
      </Button>
    </div>
  );
}

const defaultFilters: AthleteMedalsAggregateFilters = {
  count: 10,
  page: 1,
};

function AthleteTableSkeleton({ rowCount }: { rowCount: number }) {
  return (
    <TableRoot className="mt-8">
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Athlète</TableHeaderCell>
            <TableHeaderCell>Pays</TableHeaderCell>
            <TableHeaderCell>Or</TableHeaderCell>
            <TableHeaderCell>Argent</TableHeaderCell>
            <TableHeaderCell>Bronze</TableHeaderCell>
            <TableHeaderCell className="text-right">Total</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.from({ length: rowCount }).map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <Skeleton className="w-36" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-36" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-36" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-36" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-36" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="w-36" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableRoot>
  );
}

export function AthleteMedalsTable() {
  const [filters, setFilters] = useState<AthleteMedalsAggregateFilters>(defaultFilters);
  const { isPending, isError, error, data: medals } = useGetMedalsByAthlete(filters);

  const getTotalMedals = (athlete: AthleteMedalsAggregate) => {
    return athlete.goldMedalCount + athlete.silverMedalCount + athlete.bronzeMedalCount;
  };

  const handlePageChange = (page: number) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      page,
    }));
  };

  return (
    <>
      <AthleteMedalsToolbar />
      <TableRoot className="mt-8">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Athlète</TableHeaderCell>
              <TableHeaderCell>Pays</TableHeaderCell>
              <TableHeaderCell>Or</TableHeaderCell>
              <TableHeaderCell>Argent</TableHeaderCell>
              <TableHeaderCell>Bronze</TableHeaderCell>
              <TableHeaderCell className="text-right">Total</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {medals?.data ? (
              medals.data.map((athlete) => (
                <TableRow key={athlete.name} className="hover:bg-gray-50">
                  <TableCell className="">{athlete.name}</TableCell>
                  <TableCell>{athlete.country}</TableCell>
                  <TableCell>{athlete.goldMedalCount}</TableCell>
                  <TableCell>{athlete.silverMedalCount}</TableCell>
                  <TableCell>{athlete.bronzeMedalCount}</TableCell>
                  <TableCell className="text-right">{getTotalMedals(athlete)}</TableCell>
                </TableRow>
              ))
            ) : (
              <AthleteTableSkeleton rowCount={filters.count} />
            )}
          </TableBody>
        </Table>
      </TableRoot>

      <DynamicPagination
        className="mt-4 justify-end"
        total={medals?.totalPages ?? 0}
        page={filters.page}
        onChange={handlePageChange}
        showControls
      />
    </>
  );
}
