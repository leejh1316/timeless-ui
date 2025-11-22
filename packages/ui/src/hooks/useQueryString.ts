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

export const useQueryString = <K extends string, V extends Record<string, string>, U extends V[keyof V] = V[keyof V]>() => {
  const [searchParams, setSearchParams] = useSearchParams();

  /**  query string을 object로 변환합니다. */
  const getQueryObject = () => Object.fromEntries(searchParams.entries());

  /** Key에 해당하는 value을 반환합니다. */
  const getQueryParam = (key: K | string): string | null => searchParams.get(key);

  /** 쿼리스트링에 key 또는 key와 value가 일치 여부 반환 */
  const hasQueryParam = (key: K | string, value: U | string | undefined = undefined): boolean => searchParams.has(key, value);

  /** 기존 query string을 유지하면서 새로운 query param을 추가합니다. */
  const appendQueryParam = (key: K | string, value: U | string, options: NavigateOptions = { replace: false }) => {
    setSearchParams({ ...getQueryObject(), [key]: value }, options);
  };

  /** 객체형식으로 기존 query string을 유지하면서 새로운 query param을 추가합니다. */
  const appendQueryObjectParams = (params: Record<string, string>, options: NavigateOptions = { replace: false }) => {
    setSearchParams({ ...getQueryObject(), ...params }, options);
  };

  /** 현재 쿼리 스트링에 해당하는 key의 value를 변경합니다. */
  const updateQueryParam = (key: K | string, value: U | string, options: NavigateOptions = { replace: false }) => {
    const { [key]: queryValue, ...queryObject } = getQueryObject();
    if (!queryValue || queryValue === value) return;
    setSearchParams({ [key]: value, ...queryObject }, options);
  };

  /** 객체 형식으로 해당하는 key의 value를 변경합니다. */
  const updateQueryObjectParams = (params: Record<string, string>, options: NavigateOptions = { replace: false }) => {
    const queryObject = getQueryObject();
    const updatedParams = Object.entries(params).reduce(
      (acc, [key, value]) => {
        if (queryObject[key] !== value) {
          acc[key] = value;
        }
        return acc;
      },
      {} as Record<string, any>,
    );
    setSearchParams({ ...queryObject, ...updatedParams }, options);
  };
  /** 특정 key에 해당하는 query param을 제거합니다. */
  const removeQueryParam = (key: K | string, options: NavigateOptions = { replace: false }) => {
    const { [key]: _, ...queryObject } = getQueryObject();
    setSearchParams(queryObject, options);
  };

  /** 기존의 query string에서 새로운 query string으로 교체합니다. */
  const replaceQueryParam = (params: Record<string, string>, options: NavigateOptions = { replace: false }) => {
    setSearchParams({ ...params }, options);
  };

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
