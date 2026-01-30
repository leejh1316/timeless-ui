import { useContext, useCallback } from "react";
import { useSearchParams, type NavigateOptions } from "react-router";
import { QueryStringContext } from "./QueryStringProvider";
import type { QueryStringContextValue, MergeQueryOptions, SetQueryParamOptions, QueryParamType } from "./types";
import { isEmpty, parseQueryValue } from "./utils";

/**
 * useQueryString
 *
 * QueryString을 조작하는 훅입니다.
 *
 * - QueryStringProvider 내부에서 사용 시: 동시성 안전한 배치 처리
 * - QueryStringProvider 외부에서 사용 시: 기존 방식으로 동작 (하위 호환)
 *
 * @example
 * // Provider 내부에서 사용 (권장)
 * const { mergeQuery, getQueryParam } = useQueryString();
 * await mergeQuery({ page: '1', filter: 'active' });
 *
 * // Provider 외부에서 사용 (하위 호환)
 * const { mergeQuery, getQueryParam } = useQueryString();
 * mergeQuery({ page: '1' }); // Promise 반환하지만 즉시 실행
 */
export const useQueryString = (): QueryStringContextValue => {
  const context = useContext(QueryStringContext);

  // Provider 내부라면 Context 값 반환
  if (context) {
    return context;
  }

  // Provider 외부: 기존 방식으로 동작 (하위 호환)
  return useQueryStringFallback();
};

/**
 * Provider 없이 사용할 때의 fallback 구현
 * 기존 useQueryString과 동일한 동작을 하지만 Promise를 반환
 */
const useQueryStringFallback = (): QueryStringContextValue => {
  const [searchParams, setSearchParams] = useSearchParams();

  // --- Getters ---
  const getQueryParam = useCallback((key: string): string | null => searchParams.get(key), [searchParams]);

  const getQueryParamAs = useCallback(
    (key: string, type: QueryParamType, defaultValue?: string | number | boolean): string | number | boolean => {
      return parseQueryValue(searchParams.get(key), type, defaultValue);
    },
    [searchParams],
  ) as QueryStringContextValue["getQueryParamAs"];

  const getQueryParamAll = useCallback((key: string): string[] => searchParams.getAll(key), [searchParams]);

  const getQueryObject = useCallback((): Record<string, string> => Object.fromEntries(searchParams.entries()), [searchParams]);

  const hasQueryParam = useCallback(
    (key: string, value?: string): boolean => {
      if (value === undefined) return searchParams.has(key);
      return searchParams.getAll(key).includes(value);
    },
    [searchParams],
  );

  // --- Setters (Promise 반환하지만 즉시 실행) ---
  const setQueryParam = useCallback(
    (key: string, value: string, options?: SetQueryParamOptions): Promise<void> => {
      const { skipEmpty, ...navigateOptions } = options ?? {};

      setSearchParams((prev) => {
        if (skipEmpty && isEmpty(value)) {
          prev.delete(key);
        } else {
          prev.set(key, value);
        }
        return prev;
      }, navigateOptions);

      return Promise.resolve();
    },
    [setSearchParams],
  );

  const appendQueryParam = useCallback(
    (key: string, value: string, options?: NavigateOptions): Promise<void> => {
      setSearchParams((prev) => {
        prev.append(key, value);
        return prev;
      }, options);
      return Promise.resolve();
    },
    [setSearchParams],
  );

  const removeQueryParam = useCallback(
    (key: string, options?: NavigateOptions): Promise<void> => {
      setSearchParams((prev) => {
        prev.delete(key);
        return prev;
      }, options);
      return Promise.resolve();
    },
    [setSearchParams],
  );

  const removeQueryParamValue = useCallback(
    (key: string, value: string, options?: NavigateOptions): Promise<void> => {
      setSearchParams((prev) => {
        const allValues = prev.getAll(key);
        const newValues = allValues.filter((v) => v !== value);
        prev.delete(key);
        newValues.forEach((v) => prev.append(key, v));
        return prev;
      }, options);
      return Promise.resolve();
    },
    [setSearchParams],
  );

  const setQuery = useCallback(
    (params: Record<string, string | string[]>, options?: NavigateOptions): Promise<void> => {
      setSearchParams(params, options);
      return Promise.resolve();
    },
    [setSearchParams],
  );

  const mergeQuery = useCallback(
    (params: Record<string, string>, options?: MergeQueryOptions): Promise<void> => {
      const { skipEmpty = true, ...navigateOptions } = options ?? {};

      setSearchParams((prev) => {
        for (const [key, value] of Object.entries(params)) {
          if (skipEmpty && isEmpty(value)) {
            prev.delete(key);
          } else {
            prev.set(key, value);
          }
        }
        return prev;
      }, navigateOptions);

      return Promise.resolve();
    },
    [setSearchParams],
  );

  return {
    queryString: searchParams,
    setQueryString: setSearchParams,
    getQueryParam,
    getQueryParamAs,
    getQueryParamAll,
    getQueryObject,
    hasQueryParam,
    setQueryParam,
    appendQueryParam,
    removeQueryParam,
    removeQueryParamValue,
    setQuery,
    mergeQuery,
  };
};
