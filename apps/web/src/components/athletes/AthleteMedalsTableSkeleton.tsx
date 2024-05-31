import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRoot,
  TableRow,
} from "@/components/ui/Table";
import { Skeleton } from "@/components/ui/Skeleton";

interface AthleteMedalsTableSkeletonProps {
  rows: number;
}

export function AthleteMedalsTableSkeleton({ rows }: AthleteMedalsTableSkeletonProps) {
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
          {Array.from({ length: rows }).map((_, index) => (
            <TableRow key={index}>
              {Array.from({ length: 6 }).map((_, index) => (
                <TableCell key={index}>
                  <Skeleton className="h-4 w-28" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableRoot>
  );
}
