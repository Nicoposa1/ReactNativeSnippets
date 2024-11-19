import * as React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

import { cn } from '@/lib/utils';
import { ButtonProps, buttonVariants } from '@/components/ui/button';

const Pagination = ({ className, ...props }: React.ComponentProps<'nav'>) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn('mx-auto flex w-full justify-center p-4', className)}
    {...props}
  />
);
Pagination.displayName = 'Pagination';

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<'ul'>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn('flex flex-wrap items-center gap-1', className)}
    {...props}
  />
));
PaginationContent.displayName = 'PaginationContent';

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<'li'>
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn('flex items-center', className)}
    {...props}
  />
));
PaginationItem.displayName = 'PaginationItem';

const PaginationButton = React.forwardRef<
  HTMLButtonElement,
  ButtonProps
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(buttonVariants({ variant: 'ghost' }), 'px-3 py-2', className)}
    {...props}
  />
));
PaginationButton.displayName = 'PaginationButton';

export function PaginationComponent() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationButton>
            <ChevronLeft className="h-4 w-4" />
          </PaginationButton>
        </PaginationItem>
        <PaginationItem>
          <PaginationButton>1</PaginationButton>
        </PaginationItem>
        <PaginationItem>
          <PaginationButton>2</PaginationButton>
        </PaginationItem>
        <PaginationItem>
          <PaginationButton>3</PaginationButton>
        </PaginationItem>
        <PaginationItem>
          <PaginationButton>
            <MoreHorizontal className="h-4 w-4" />
          </PaginationButton>
        </PaginationItem>
        <PaginationItem>
          <PaginationButton>
            <ChevronRight className="h-4 w-4" />
          </PaginationButton>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}