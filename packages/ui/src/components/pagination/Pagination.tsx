import { forwardRef } from "react";
import clsx from "clsx";
import { createContextScope, Scope } from "src/hooks/useCreateContext";
import { PaginationItem, usePagination, UsePaginationProps } from "src/hooks";
import { Primitive, PrimitivePropsWithRef } from "../primitive/Primitive";
import { Button } from "../button/Button";

type ScopedProps<P> = P & { __scopePagination?: Scope };
const PAGINATION_NAME = "Pagination";
const [createPaginationContext, createPaginationScope] = createContextScope(PAGINATION_NAME);

type PaginationContextValueType = {
  page: number;
  totalPages: number;
  paginationRange: PaginationItem[];
  isFirstPage: boolean;
  isLastPage: boolean;
};
type PaginationContextActionType = {
  setPage?: (page: number) => void;
  handleNext?: () => void;
  handlePrevious?: () => void;
  handleSkipNext?: () => void;
  handleSkipPrevious?: () => void;
};

const [PaginationValueProvider, usePaginationValueContext] =
  createPaginationContext<PaginationContextValueType>(PAGINATION_NAME);
const [PaginationActionProvider, usePaginationActionContext] =
  createPaginationContext<PaginationContextActionType>(PAGINATION_NAME);

// ----------- Pagination.Root ----------
interface BasePaginationRootProps extends PrimitivePropsWithRef<"div">, UsePaginationProps {}
export const BasePaginationRoot = forwardRef<React.ComponentRef<"div">, ScopedProps<BasePaginationRootProps>>(
  (props, forwardedRef) => {
    const {
      __scopePagination,
      totalItems,
      itemsPerPage,
      siblings,
      boundaries,
      defaultPage,
      currentPage,
      onPageChange,
      ...elementProps
    } = props;
    const pagination = usePagination({
      totalItems,
      itemsPerPage,
      siblings,
      boundaries,
      defaultPage,
      currentPage,
      onPageChange,
    });
    const { setPage, handleNext, handlePrevious, handleSkipNext, handleSkipPrevious, ...values } = pagination;
    return (
      <PaginationValueProvider scope={__scopePagination} {...values}>
        <PaginationActionProvider
          scope={__scopePagination}
          setPage={setPage}
          handleNext={handleNext}
          handlePrevious={handlePrevious}
          handleSkipNext={handleSkipNext}
          handleSkipPrevious={handleSkipPrevious}
        >
          <Primitive.div role="navigation" aria-label="페이지 네비게이션" ref={forwardedRef} {...elementProps} />
        </PaginationActionProvider>
      </PaginationValueProvider>
    );
  },
);
BasePaginationRoot.displayName = "Pagination.Root";

// ----------- Pagination.Prev ----------
const PAGINATION_PREV_NAME = "PaginationPrev";
export const BasePaginationPrev = forwardRef<
  React.ComponentRef<typeof Button>,
  ScopedProps<PrimitivePropsWithRef<typeof Button>>
>((props, forwardedRef) => {
  const { __scopePagination, disabled } = props;
  const { handlePrevious } = usePaginationActionContext(PAGINATION_PREV_NAME, __scopePagination);
  const { isFirstPage } = usePaginationValueContext(PAGINATION_PREV_NAME, __scopePagination);
  const isDisabled = disabled ?? isFirstPage;
  return (
    <Button aria-label="이전 페이지" ref={forwardedRef} onClick={handlePrevious} disabled={isDisabled} {...props} />
  );
});
BasePaginationPrev.displayName = "Pagination.Prev";

// ----------- Pagination.SkipPrev ----------
const PAGINATION_SKIP_PREV_NAME = "PaginationSkipPrev";
export const BasePaginationSkipPrev = forwardRef<
  React.ComponentRef<typeof Button>,
  ScopedProps<PrimitivePropsWithRef<typeof Button>>
>((props, forwardedRef) => {
  const { __scopePagination, disabled } = props;
  const { handleSkipPrevious } = usePaginationActionContext(PAGINATION_SKIP_PREV_NAME, __scopePagination);
  const { isFirstPage } = usePaginationValueContext(PAGINATION_SKIP_PREV_NAME, __scopePagination);
  const isDisabled = disabled ?? isFirstPage;
  return (
    <Button
      aria-label="이전 그룹 페이지"
      ref={forwardedRef}
      onClick={handleSkipPrevious}
      disabled={isDisabled}
      {...props}
    />
  );
});
BasePaginationSkipPrev.displayName = "Pagination.SkipPrev";

// ----------- Pagination.Next ----------
const PAGINATION_NEXT_NAME = "PaginationNext";
export const BasePaginationNext = forwardRef<
  React.ComponentRef<typeof Button>,
  ScopedProps<PrimitivePropsWithRef<typeof Button>>
>((props, forwardedRef) => {
  const { __scopePagination, disabled } = props;
  const { handleNext } = usePaginationActionContext(PAGINATION_NEXT_NAME, __scopePagination);
  const { isLastPage } = usePaginationValueContext(PAGINATION_NEXT_NAME, __scopePagination);
  const isDisabled = disabled ?? isLastPage;
  return <Button aria-label="다음 페이지" ref={forwardedRef} onClick={handleNext} disabled={isDisabled} {...props} />;
});
BasePaginationNext.displayName = "Pagination.Next";

// ----------- Pagination.SkipNext ----------
const PAGINATION_SKIP_NEXT_NAME = "PaginationSkipNext";
export const BasePaginationSkipNext = forwardRef<
  React.ComponentRef<typeof Button>,
  ScopedProps<PrimitivePropsWithRef<typeof Button>>
>((props, forwardedRef) => {
  const { __scopePagination, disabled } = props;
  const { handleSkipNext } = usePaginationActionContext(PAGINATION_SKIP_NEXT_NAME, __scopePagination);
  const { isLastPage } = usePaginationValueContext(PAGINATION_SKIP_NEXT_NAME, __scopePagination);
  const isDisabled = disabled ?? isLastPage;
  return (
    <Button
      aria-label="다음 그룹 페이지"
      ref={forwardedRef}
      onClick={handleSkipNext}
      disabled={isDisabled}
      {...props}
    />
  );
});
BasePaginationSkipNext.displayName = "Pagination.SkipNext";

// ----------- Pagination.Pages ----------
const PAGINATION_PAGES_NAME = "PaginationPages";
interface BasePaginationPagesProps extends Omit<PrimitivePropsWithRef<"ul">, "children" | "asChild"> {
  children: (page: PaginationItem) => React.ReactNode;
}
export const BasePaginationPages = forwardRef<React.ComponentRef<"nav">, ScopedProps<BasePaginationPagesProps>>(
  (props, forwardedRef) => {
    const { __scopePagination, children, ...elementProps } = props;
    const { paginationRange } = usePaginationValueContext(PAGINATION_PAGES_NAME, __scopePagination);
    return (
      <Primitive.nav aria-label="페이지 목록" ref={forwardedRef} {...elementProps}>
        {paginationRange.map((page) => children(page))}
      </Primitive.nav>
    );
  },
);
BasePaginationPages.displayName = "Pagination.Pages";

// ----------- Pagination.Page ----------
const PAGINATION_PAGE_NAME = "PaginationPage";
interface BasePaginationPageProps extends PrimitivePropsWithRef<typeof Button> {
  page: PaginationItem;
}
export const BasePaginationPage = forwardRef<React.ComponentRef<typeof Button>, ScopedProps<BasePaginationPageProps>>(
  (props, forwardedRef) => {
    const { __scopePagination, page, onClick, ...elementProps } = props;
    const { page: currentPage } = usePaginationValueContext(PAGINATION_PAGE_NAME, __scopePagination);
    const { setPage } = usePaginationActionContext(PAGINATION_PAGE_NAME, __scopePagination);
    const isCurrentPage = page.type === "page" && page.page === currentPage;
    return (
      <Button
        ref={forwardedRef}
        aria-current={isCurrentPage ? "page" : undefined}
        aria-label={page.type === "page" ? `${page.page} 페이지` : undefined}
        onClick={(e) => {
          onClick?.(e);
          if (page.type === "page") {
            setPage?.(page.page);
          }
        }}
        data-state={isCurrentPage ? "active" : "inactive"}
        {...elementProps}
      >
        {page.type === "page" && page.page}
      </Button>
    );
  },
);

const Pagination = {
  Root: BasePaginationRoot,
  Prev: BasePaginationPrev,
  SkipPrev: BasePaginationSkipPrev,
  Next: BasePaginationNext,
  SkipNext: BasePaginationSkipNext,
  Pages: BasePaginationPages,
  Page: BasePaginationPage,
};

export { Pagination };
