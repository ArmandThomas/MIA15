import type { AthleteMedalsAggregate } from "@shared/dto/AthleteMedalsAggregate";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRoot,
  TableRow,
} from "@/components/ui/Table";

interface AthleteMedalsTableProps {
  medals: AthleteMedalsAggregate[];
}

function getTotalMedals(athlete: AthleteMedalsAggregate) {
  return athlete.goldMedalCount + athlete.silverMedalCount + athlete.bronzeMedalCount;
}

export function AthleteMedalsTable({ medals }: AthleteMedalsTableProps) {
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
          {medals.map((athlete) => (
            <TableRow key={athlete.name} className="hover:bg-gray-50">
              <TableCell>{athlete.name}</TableCell>
              <TableCell>{athlete.country}</TableCell>
              <TableCell>{athlete.goldMedalCount}</TableCell>
              <TableCell>{athlete.silverMedalCount}</TableCell>
              <TableCell>{athlete.bronzeMedalCount}</TableCell>
              <TableCell className="text-right">{getTotalMedals(athlete)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableRoot>
  );
}
