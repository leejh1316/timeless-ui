import { createContext, useRef, useCallback, useMemo, useEffect, type ReactNode } from "react";
import { useSearchParams, type NavigateOptions } from "react-router";
import type { QueryStringContextValue, QueryUpdateEvent, MergeQueryOptions, SetQueryParamOptions, QueryParamType } from "./types";
import { isEmpty, parseQueryValue } from "./utils";

export const QueryStringContext = createContext<QueryStringContextValue | null>(null);

interface QueryStringProviderProps {
  children: ReactNode;
  /** 이벤트 수집 시간 (ms). 이 시간 동안 들어온 이벤트를 배치로 처리합니다. (기본값: 50ms) */
  batchDelay?: number;
}

/**
 * QueryStringProvider
 *
 * 동시성 문제를 해결하기 위한 QueryString Context Provider입니다.
 *
 * 특징:
 * 1. 여러 컴포넌트에서 동시에 쿼리 업데이트 이벤트를 받아 처리
 * 2. batchDelay 동안 이벤트를 수집하여 배치로 처리
 * 3. 큐 기반으로 순차적 처리하여 데이터 일관성 보장
 * 4. 업데이트가 완료된 후에만 다음 배치 처리
 *
 * @example
 * // App.tsx 또는 Router 레벨에서 감싸기
 * <QueryStringProvider batchDelay={100}>
 *   <App />
 * </QueryStringProvider>
 *
 * // 하위 컴포넌트에서 사용
 * const { mergeQuery, getQueryParam } = useQueryString();
 *
 * // 여러 컴포넌트에서 동시에 호출해도 안전
 * await mergeQuery({ page: '1' });
 */
export const QueryStringProvider = ({ children, batchDelay = 50 }: QueryStringProviderProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // 큐: 배치 단위로 처리할 이벤트들
  const queueRef = useRef<QueryUpdateEvent[][]>([]);
  // 현재 수집 중인 배치
  const currentBatchRef = useRef<QueryUpdateEvent[]>([]);
  // 배치 수집 타이머
  const batchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // 현재 처리 중인지 여부
  const isProcessingRef = useRef(false);

  /**
   * 큐에서 다음 배치를 처리합니다.
   */
  const processQueue = useCallback(() => {
    if (isProcessingRef.current || queueRef.current.length === 0) {
      return;
    }

    isProcessingRef.current = true;

    const batch = queueRef.current.shift()!;

    // 배치 내 모든 이벤트의 params를 병합
    const mergedParams: Record<string, string> = {};
    let finalOptions: MergeQueryOptions = { skipEmpty: true };

    for (const event of batch) {
      Object.assign(mergedParams, event.params);
      if (event.options) {
        finalOptions = { ...finalOptions, ...event.options };
      }
    }

    const { skipEmpty = true, ...navigateOptions } = finalOptions;

    // setSearchParams의 함수형 업데이트 사용으로 최신 상태 보장
    setSearchParams((prev) => {
      for (const [key, value] of Object.entries(mergedParams)) {
        if (skipEmpty && isEmpty(value)) {
          prev.delete(key);
        } else {
          prev.set(key, value);
        }
      }
      return prev;
    }, navigateOptions);

    // 모든 이벤트의 Promise resolve
    for (const event of batch) {
      event.resolve();
    }

    isProcessingRef.current = false;

    // 다음 배치 처리
    queueMicrotask(() => {
      processQueue();
    });
  }, [setSearchParams]);

  /**
   * 현재 수집 중인 배치를 큐에 추가하고 처리를 시작합니다.
   */
  const flushBatch = useCallback(() => {
    if (currentBatchRef.current.length > 0) {
      queueRef.current.push([...currentBatchRef.current]);
      currentBatchRef.current = [];
    }
    batchTimerRef.current = null;
    processQueue();
  }, [processQueue]);

  /**
   * 쿼리 업데이트 이벤트를 배치에 추가합니다.
   */
  const enqueueBatchUpdate = useCallback(
    (params: Record<string, string>, options?: MergeQueryOptions): Promise<void> => {
      return new Promise((resolve) => {
        const event: QueryUpdateEvent = { params, options, resolve };
        currentBatchRef.current.push(event);

        if (!batchTimerRef.current) {
          batchTimerRef.current = setTimeout(flushBatch, batchDelay);
        }
      });
    },
    [batchDelay, flushBatch],
  );

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

  // --- Setters (배치 처리) ---
  const setQueryParam = useCallback(
    (key: string, value: string, options?: SetQueryParamOptions): Promise<void> => {
      const { skipEmpty, ...navigateOptions } = options ?? {};
      const params: Record<string, string> = {};

      if (skipEmpty && isEmpty(value)) {
        params[key] = ""; // 빈 문자열로 설정하면 skipEmpty: true로 삭제됨
      } else {
        params[key] = value;
      }

      return enqueueBatchUpdate(params, { skipEmpty: skipEmpty ?? false, ...navigateOptions });
    },
    [enqueueBatchUpdate],
  );

  const appendQueryParam = useCallback(
    (key: string, value: string, options?: NavigateOptions): Promise<void> => {
      // append는 기존 값을 유지해야 하므로 특별 처리
      return new Promise((resolve) => {
        setSearchParams((prev) => {
          prev.append(key, value);
          return prev;
        }, options);
        resolve();
      });
    },
    [setSearchParams],
  );

  const removeQueryParam = useCallback(
    (key: string, options?: NavigateOptions): Promise<void> => {
      return enqueueBatchUpdate({ [key]: "" }, { skipEmpty: true, ...options });
    },
    [enqueueBatchUpdate],
  );

  const removeQueryParamValue = useCallback(
    (key: string, value: string, options?: NavigateOptions): Promise<void> => {
      return new Promise((resolve) => {
        setSearchParams((prev) => {
          const allValues = prev.getAll(key);
          const newValues = allValues.filter((v) => v !== value);
          prev.delete(key);
          newValues.forEach((v) => prev.append(key, v));
          return prev;
        }, options);
        resolve();
      });
    },
    [setSearchParams],
  );

  const setQuery = useCallback(
    (params: Record<string, string | string[]>, options?: NavigateOptions): Promise<void> => {
      return new Promise((resolve) => {
        setSearchParams(params, options);
        resolve();
      });
    },
    [setSearchParams],
  );

  const mergeQuery = useCallback(
    (params: Record<string, string>, options?: MergeQueryOptions): Promise<void> => {
      return enqueueBatchUpdate(params, options);
    },
    [enqueueBatchUpdate],
  );

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (batchTimerRef.current) {
        clearTimeout(batchTimerRef.current);
      }
    };
  }, []);

  const contextValue = useMemo<QueryStringContextValue>(
    () => ({
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
    }),
    [
      searchParams,
      setSearchParams,
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
    ],
  );

  return <QueryStringContext.Provider value={contextValue}>{children}</QueryStringContext.Provider>;
};
