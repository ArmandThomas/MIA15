import { DynamicPagination } from "@/components/DynamicPagination";

interface AthleteMedalsPaginationProps {
  className?: string;
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onPageHover?: (page: number) => void;
}

export function AthleteMedalsPagination({
  className,
  totalPages,
  currentPage,
  onPageChange,
  onPageHover,
}: AthleteMedalsPaginationProps) {
  return (
    <DynamicPagination
      className={className}
      total={totalPages}
      page={currentPage}
      onChange={onPageChange}
      onHover={onPageHover}
      showControls
    />
  );
}
