import React from "react";
import {
  usePagination,
  PaginationItemControl,
  type PaginationOptions,
  type PaginationItemType,
} from "@/hooks/usePagination";
import {
  Pagination,
  PaginationContent,
  PaginationControl,
  PaginationDots,
  PaginationItem,
  PaginationLink,
} from "./ui/Pagination";

interface PaginationProps extends PaginationOptions {
  className?: string;
  /** Nombre de pages sautées par les points de suspension */
  dotJumps?: number;
  /** Trigger au passage de la souris sur un élément */
  onHover?: (page: number) => void;
}

export function DynamicPagination({ className, dotJumps = 5, onHover, ...opts }: PaginationProps) {
  const { currentPage, paginationItems, onPageChange, onNext, onPrevious } = usePagination(opts);

  const renderPaginationItem = React.useCallback(
    (item: PaginationItemType, index: number) => {
      const isBefore = index < paginationItems.indexOf(currentPage);
      const isLastPage = currentPage === opts.total;
      const isFirstPage = currentPage === 1;

      if (item === PaginationItemControl.Dots) {
        const page = isBefore ? currentPage - dotJumps : currentPage + dotJumps;
        return (
          <PaginationDots
            direction={isBefore ? "left" : "right"}
            onClick={() => onPageChange(page)}
          />
        );
      }

      if (item === PaginationItemControl.Previous) {
        return (
          <PaginationControl
            onClick={onPrevious}
            disabled={isFirstPage}
            onMouseEnter={() => onHover?.(currentPage - 1)}
            direction="left"
          />
        );
      }

      if (item === PaginationItemControl.Next) {
        return (
          <PaginationControl
            onClick={onNext}
            disabled={isLastPage}
            onMouseEnter={() => onHover?.(currentPage + 1)}
            direction="right"
          />
        );
      }

      return (
        <PaginationLink
          onClick={() => onPageChange(item)}
          onMouseEnter={() => onHover?.(item)}
          isActive={item === currentPage}
        >
          {item}
        </PaginationLink>
      );
    },
    [currentPage, paginationItems, onPageChange, onNext, onPrevious, dotJumps, opts.total, onHover],
  );

  return (
    <Pagination className={className}>
      <PaginationContent>
        {paginationItems.map((item, idx) => (
          <PaginationItem key={idx}>{renderPaginationItem(item, idx)}</PaginationItem>
        ))}
      </PaginationContent>
    </Pagination>
  );
}
