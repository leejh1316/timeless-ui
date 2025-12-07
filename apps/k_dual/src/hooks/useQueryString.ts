import { useCallback } from "react";
import { NavigateOptions, useSearchParams } from "react-router";

/**
 * react-route의 useSearchParams를 사용하여 query string을 다루는 커스텀 훅입니다.
 *
 * 이 훅은 다음의 역할을 합니다.
 * 1. query string을 object로 변환합니다.
 * 2. query string에 key를 추가합니다.
 * 3. query string에 key를 제거합니다.
 * 4. query string에 key를 수정합니다.
 * 5. query string에 key가 있는지 확인합니다.
 * 6. 기존의 query string을 유지하면서 새로운 query param을 추가합니다.
 * 7. 또는 전체 query string을 교체합니다.
 * 8. 객체 형식 또는 단일 리터럴 형식으로 사용할 수 있습니다.
 *
 */

export const useQueryString = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  /**  query string을 object로 변환합니다. */
  const getQueryObject = useCallback(
    () => Object.fromEntries(searchParams.entries()),
    [searchParams],
  );

  /** Key에 해당하는 value을 반환합니다. */
  const getQueryParam = useCallback(
    (key: string): string | null => searchParams.get(key),
    [searchParams],
  );

  /** 쿼리스트링에 key 또는 key와 value가 일치 여부 반환 */
  const hasQueryParam = useCallback(
    (key: string, value?: string): boolean => {
      if (value === undefined) return searchParams.has(key);
      return searchParams.get(key) === value;
    },
    [searchParams],
  );

  /** 기존 query string을 유지하면서 새로운 query param을 추가(또는 덮어쓰기)합니다. */
  const appendQueryParam = useCallback(
    (key: string, value: string, options: NavigateOptions = { replace: true }) => {
      const newParams = new URLSearchParams(searchParams);
      newParams.set(key, value);
      setSearchParams(newParams, options);
    },
    [searchParams, setSearchParams],
  );

  /** 객체형식으로 기존 query string을 유지하면서 새로운 query param을 추가(또는 덮어쓰기)합니다. */
  const appendQueryObjectParams = useCallback(
    (params: Record<string, string>, options: NavigateOptions = { replace: true }) => {
      const newParams = new URLSearchParams(searchParams);
      Object.entries(params).forEach(([key, value]) => {
        newParams.set(key, value);
      });
      setSearchParams(newParams, options);
    },
    [searchParams, setSearchParams],
  );

  /** 현재 쿼리 스트링에 해당하는 key가 존재할 때만 value를 변경합니다. */
  const updateQueryParam = useCallback(
    (key: string, value: string, options: NavigateOptions = { replace: true }) => {
      if (!searchParams.has(key)) return;
      if (searchParams.get(key) === value) return;

      const newParams = new URLSearchParams(searchParams);
      newParams.set(key, value);
      setSearchParams(newParams, options);
    },
    [searchParams, setSearchParams],
  );

  /** 객체 형식으로 해당하는 key가 존재할 때만 value를 변경합니다. */
  const updateQueryObjectParams = useCallback(
    (params: Record<string, string>, options: NavigateOptions = { replace: true }) => {
      const newParams = new URLSearchParams(searchParams);
      let hasChanges = false;

      Object.entries(params).forEach(([key, value]) => {
        if (newParams.has(key) && newParams.get(key) !== value) {
          newParams.set(key, value);
          hasChanges = true;
        }
      });

      if (hasChanges) {
        setSearchParams(newParams, options);
      }
    },
    [searchParams, setSearchParams],
  );

  /** 특정 key에 해당하는 query param을 제거합니다. */
  const removeQueryParam = useCallback(
    (key: string, options: NavigateOptions = { replace: true }) => {
      if (!searchParams.has(key)) return;

      const newParams = new URLSearchParams(searchParams);
      newParams.delete(key);
      setSearchParams(newParams, options);
    },
    [searchParams, setSearchParams],
  );

  /** 기존의 query string에서 새로운 query string으로 교체합니다. */
  const replaceQueryParam = useCallback(
    (params: Record<string, string>, options: NavigateOptions = { replace: true }) => {
      setSearchParams(params, options);
    },
    [setSearchParams],
  );

  return {
    queryString: searchParams,
    setQueryString: setSearchParams,
    getQueryObject,
    getQueryParam,
    hasQueryParam,
    appendQueryParam,
    appendQueryObjectParams,
    updateQueryParam,
    updateQueryObjectParams,
    removeQueryParam,
    replaceQueryParam,
  };
};
