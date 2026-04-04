import { forwardRef } from "react";
import { createContextScope, Scope } from "../../hooks/useCreateContext";
import { PaginationItem, usePagination, UsePaginationProps } from "./usePagination";
import { Primitive, PrimitivePropsWithRef } from "../primitive/Primitive";
import { Button } from "../button/Button";
import { composeEventHandlers } from "@src/utils/composeEventHandlers";

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

const [PaginationValueProvider, usePaginationValueContext] = createPaginationContext<PaginationContextValueType>(PAGINATION_NAME);
const [PaginationActionProvider, usePaginationActionContext] = createPaginationContext<PaginationContextActionType>(PAGINATION_NAME);

// ----------- Pagination.Root ----------
interface PaginationRootProps extends PrimitivePropsWithRef<"div">, UsePaginationProps {}
export const PaginationRoot = forwardRef<React.ComponentRef<"div">, ScopedProps<PaginationRootProps>>((props, forwardedRef) => {
  const { __scopePagination, totalItems, itemsPerPage, siblings, boundaries, defaultPage, currentPage, onPageChange, ...otherProps } =
    props;
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
        <Primitive.div role="navigation" aria-label="페이지네이션" ref={forwardedRef} {...otherProps} />
      </PaginationActionProvider>
    </PaginationValueProvider>
  );
});
PaginationRoot.displayName = "Pagination.Root";

// ----------- Pagination.Prev ----------
const PAGINATION_PREV_NAME = "PaginationPrev";
const PaginationPrev = forwardRef<React.ComponentRef<typeof Button>, ScopedProps<PrimitivePropsWithRef<typeof Button>>>(
  (props, forwardedRef) => {
    const { __scopePagination, disabled, onClick, ...otherProps } = props;
    const { handlePrevious } = usePaginationActionContext(PAGINATION_PREV_NAME, __scopePagination);
    const { isFirstPage } = usePaginationValueContext(PAGINATION_PREV_NAME, __scopePagination);
    const isDisabled = disabled ?? isFirstPage;

    return (
      <Button
        aria-label="이전 페이지"
        ref={forwardedRef}
        onClick={composeEventHandlers(onClick, handlePrevious)}
        disabled={isDisabled}
        {...otherProps}
      />
    );
  },
);
PaginationPrev.displayName = "Pagination.Prev";

// ----------- Pagination.SkipPrev ----------
const PAGINATION_SKIP_PREV_NAME = "PaginationSkipPrev";
const PaginationSkipPrev = forwardRef<React.ComponentRef<typeof Button>, ScopedProps<PrimitivePropsWithRef<typeof Button>>>(
  (props, forwardedRef) => {
    const { __scopePagination, disabled, onClick, ...otherProps } = props;
    const { handleSkipPrevious } = usePaginationActionContext(PAGINATION_SKIP_PREV_NAME, __scopePagination);
    const { isFirstPage } = usePaginationValueContext(PAGINATION_SKIP_PREV_NAME, __scopePagination);
    const isDisabled = disabled ?? isFirstPage;
    return (
      <Button
        aria-label="이전 그룹 페이지"
        ref={forwardedRef}
        onClick={composeEventHandlers(onClick, handleSkipPrevious)}
        disabled={isDisabled}
        {...otherProps}
      />
    );
  },
);
PaginationSkipPrev.displayName = "Pagination.SkipPrev";

// ----------- Pagination.Next ----------
const PAGINATION_NEXT_NAME = "PaginationNext";
const PaginationNext = forwardRef<React.ComponentRef<typeof Button>, ScopedProps<PrimitivePropsWithRef<typeof Button>>>(
  (props, forwardedRef) => {
    const { __scopePagination, disabled, onClick, ...otherProps } = props;
    const { handleNext } = usePaginationActionContext(PAGINATION_NEXT_NAME, __scopePagination);
    const { isLastPage } = usePaginationValueContext(PAGINATION_NEXT_NAME, __scopePagination);
    const isDisabled = disabled ?? isLastPage;
    return (
      <Button
        aria-label="다음 페이지"
        ref={forwardedRef}
        onClick={composeEventHandlers(onClick, handleNext)}
        disabled={isDisabled}
        {...otherProps}
      />
    );
  },
);
PaginationNext.displayName = "Pagination.Next";

// ----------- Pagination.SkipNext ----------
const PAGINATION_SKIP_NEXT_NAME = "PaginationSkipNext";
const PaginationSkipNext = forwardRef<React.ComponentRef<typeof Button>, ScopedProps<PrimitivePropsWithRef<typeof Button>>>(
  (props, forwardedRef) => {
    const { __scopePagination, disabled, onClick, ...otherProps } = props;
    const { handleSkipNext } = usePaginationActionContext(PAGINATION_SKIP_NEXT_NAME, __scopePagination);
    const { isLastPage } = usePaginationValueContext(PAGINATION_SKIP_NEXT_NAME, __scopePagination);
    const isDisabled = disabled ?? isLastPage;
    return (
      <Button
        aria-label="다음 그룹 페이지"
        ref={forwardedRef}
        onClick={composeEventHandlers(onClick, handleSkipNext)}
        disabled={isDisabled}
        {...otherProps}
      />
    );
  },
);
PaginationSkipNext.displayName = "Pagination.SkipNext";

// ----------- Pagination.Pages ----------
const PAGINATION_PAGES_NAME = "PaginationPages";
interface PaginationPagesProps extends Omit<PrimitivePropsWithRef<"ul">, "children" | "asChild"> {
  children: (page: PaginationItem) => React.ReactNode;
}
const PaginationPages = forwardRef<React.ComponentRef<"nav">, ScopedProps<PaginationPagesProps>>((props, forwardedRef) => {
  const { __scopePagination, children, ...elementProps } = props;
  const { paginationRange } = usePaginationValueContext(PAGINATION_PAGES_NAME, __scopePagination);
  return (
    <Primitive.nav aria-label="페이지 목록" ref={forwardedRef} {...elementProps}>
      {paginationRange.map((page) => children(page))}
    </Primitive.nav>
  );
});
PaginationPages.displayName = "Pagination.Pages";

// ----------- Pagination.Page ----------
const PAGINATION_PAGE_NAME = "PaginationPage";
interface PaginationPageProps extends PrimitivePropsWithRef<typeof Button> {
  page: PaginationItem;
}
export const PaginationPage = forwardRef<React.ComponentRef<typeof Button>, ScopedProps<PaginationPageProps>>((props, forwardedRef) => {
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
});

const Pagination = {
  Root: PaginationRoot,
  Prev: PaginationPrev,
  SkipPrev: PaginationSkipPrev,
  Next: PaginationNext,
  SkipNext: PaginationSkipNext,
  Pages: PaginationPages,
  Page: PaginationPage,
};

export { Pagination };
