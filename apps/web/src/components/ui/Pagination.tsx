import * as React from "react";
import { ChevronLeftIcon, ChevronRightIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { RiArrowLeftSLine, RiArrowRightSLine, RiMoreLine } from "@remixicon/react";

import { cn } from "@/lib/utils";
import { useHover } from "@/hooks/useHover";
import { type ButtonProps, buttonVariants } from "@/components/ui/Button";

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
);
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<HTMLUListElement, React.ComponentProps<"ul">>(
  ({ className, ...props }, ref) => (
    <ul ref={ref} className={cn("flex flex-row items-center gap-1", className)} {...props} />
  ),
);
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li">>(
  ({ className, ...props }, ref) => <li ref={ref} className={cn("", className)} {...props} />,
);
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<"a">;

const PaginationLink = ({ className, isActive, size = "icon", ...props }: PaginationLinkProps) => (
  <a
    aria-current={isActive ? "page" : undefined}
    className={cn(
      "cursor-pointer",
      buttonVariants({
        variant: isActive ? "secondary" : "ghost",
        size,
      }),
      className,
    )}
    {...props}
  />
);
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    className={cn("gap-1 pl-2.5", className)}
    {...props}
  >
    <ChevronLeftIcon className="h-4 w-4" />
    <span>Previous</span>
  </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    size="default"
    className={cn("gap-1 pr-2.5", className)}
    {...props}
  >
    <span>Next</span>
    <ChevronRightIcon className="h-4 w-4" />
  </PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = ({ className, ...props }: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <DotsHorizontalIcon className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

/* --------------------------------- custom --------------------------------- */

/** `PaginationEllipsis` with dynamic icon on hover */
interface PaginationDotsProps extends React.ComponentProps<"span"> {
  direction: "left" | "right";
  onClick: VoidFunction;
}

const PaginationDots = ({ className, direction, onClick, ...props }: PaginationDotsProps) => {
  const { hover, onMouseEnter, onMouseLeave } = useHover();

  const HoverIcon = direction === "left" ? RiArrowLeftSLine : RiArrowRightSLine;
  const DisplayIcon = hover ? HoverIcon : RiMoreLine;

  return (
    <span
      aria-hidden
      className={cn("flex h-9 w-9 items-center justify-center", className)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      {...props}
    >
      <DisplayIcon className="h-4 w-4" />
    </span>
  );
};
PaginationDots.displayName = "PaginationDots";

interface PaginationControlProps extends React.ComponentProps<typeof PaginationLink> {
  direction: "left" | "right";
  label?: string;
  disabled?: boolean;
}

/** Generic for `PaginationPrevious` and `PaginationNext` */
const PaginationControl = ({
  className,
  disabled,
  direction,
  label,
  onClick,
  ...props
}: PaginationControlProps) => {
  const DisplayIcon = direction === "left" ? RiArrowLeftSLine : RiArrowRightSLine;

  return (
    <PaginationLink
      aria-disabled={disabled}
      size="default"
      className={cn(
        // base
        "cursor-pointer",
        // with label
        label ? "gap-1 pr-1.5" : "h-9 w-9 p-0",
        className,
      )}
      onClick={disabled ? undefined : onClick}
      {...props}
    >
      {label ? <span>{label}</span> : null}
      <DisplayIcon className="h-4 w-4" />
    </PaginationLink>
  );
};
PaginationControl.displayName = "PaginationControl";

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  PaginationDots,
  PaginationControl,
};
