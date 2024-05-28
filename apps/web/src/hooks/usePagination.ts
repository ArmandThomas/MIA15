import { useCallback, useEffect, useMemo, useState } from "react";

export function createRange(start: number, end: number): number[] {
  const length = end - start + 1;
  return Array.from({ length }, (_, index) => index + start);
}

export interface PaginationOptions {
  /** Nombre total de pages */
  total: number;
  /** Page courante si contrôlée par l'extérieur */
  page?: number;
  /** Page initiale */
  initialPage?: number;
  /** Nombre de pages à afficher de chaque côté de la page courante */
  siblings?: number;
  /** Nombre de pages à afficher au début et à la fin de la pagination */
  boundaries?: number;
  /** Afficher les contrôles de navigation */
  showControls?: boolean;
  /** Callback appelé lorsqu'une page est sélectionnée */
  onChange?: (page: number) => void;
}

export enum PaginationItemControl {
  Dots = "Dots",
  Previous = "Previous",
  Next = "Next",
}

export type PaginationItemType = number | PaginationItemControl;

export const usePagination = (opts: PaginationOptions) => {
  const {
    total,
    page,
    siblings = 1,
    boundaries = 1,
    initialPage = 1,
    showControls = false,
    onChange,
  } = opts;

  const [currentPage, setCurrentPage] = useState(page || initialPage);

  useEffect(() => {
    // synchroniser la page courante si elle est contrôlée par l'extérieur
    if (page && page !== currentPage) {
      setCurrentPage(page);
    }
  }, [page, currentPage]);

  const onPageChange = (page: number) => {
    const boundedPage = Math.min(Math.max(1, page), total);
    setCurrentPage(boundedPage);
    onChange?.(boundedPage);
  };

  const onNext = () => onPageChange(currentPage + 1);
  const onPrevious = () => onPageChange(currentPage - 1);
  const onFirst = () => onPageChange(1);
  const onLast = () => onPageChange(total);

  const processPaginationItems = useCallback(
    (items: PaginationItemType[]) => {
      if (showControls) {
        return [PaginationItemControl.Previous, ...items, PaginationItemControl.Next];
      }
      return items;
    },
    [showControls],
  );

  const paginationItems = useMemo((): PaginationItemType[] => {
    const totalPageNumbers = siblings * 2 + 3 + boundaries * 2;

    if (totalPageNumbers >= total) {
      return processPaginationItems(createRange(1, total));
    }

    const leftSiblingIndex = Math.max(currentPage - siblings, boundaries);
    const rightSiblingIndex = Math.min(currentPage + siblings, total - boundaries);

    const shouldShowLeftDots = leftSiblingIndex > boundaries + 2;
    const shouldShowRightDots = rightSiblingIndex < total - (boundaries + 1);

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = siblings * 2 + boundaries + 2;
      return processPaginationItems([
        ...createRange(1, leftItemCount),
        PaginationItemControl.Dots,
        ...createRange(total - (boundaries - 1), total),
      ]);
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = boundaries + 1 + 2 * siblings;
      return processPaginationItems([
        ...createRange(1, boundaries),
        PaginationItemControl.Dots,
        ...createRange(total - rightItemCount, total),
      ]);
    }

    return processPaginationItems([
      ...createRange(1, boundaries),
      PaginationItemControl.Dots,
      ...createRange(leftSiblingIndex, rightSiblingIndex),
      PaginationItemControl.Dots,
      ...createRange(total - boundaries + 1, total),
    ]);
  }, [siblings, boundaries, total, currentPage, processPaginationItems]);

  return {
    currentPage,
    paginationItems,
    onPageChange,
    onNext,
    onPrevious,
    onFirst,
    onLast,
  };
};
