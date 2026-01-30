import { useCallback, useMemo, useRef } from "react";
import { useQueryString } from "./useQueryString";
import type { DynamicQueryStringSchema, MergeQueryOptions, QueryStringSchema, ValidatorFn } from "./types";

/**
 * useQueryStringValidate
 *
 * 스키마 기반으로 쿼리 파라미터를 검증하고 관리하는 훅입니다.
 *
 * @example
 * // 1. 기본 사용 (정적 validators)
 * const schema = {
 *   defaultValues: { page: 1, sort: 'asc', filter: '' },
 *   validators: {
 *     page: (v) => v > 0,
 *     sort: (v) => ['asc', 'desc'].includes(v),
 *   },
 * };
 * const { getValidatedParams } = useQueryStringValidate(schema);
 *
 * // 2. 동적 validators (서버 데이터 기반 검증)
 * const schema = {
 *   defaultValues: { page: 1, tag: 'all' },
 *   validators: {
 *     page: (v) => v > 0,
 *     tag: (v, allowedTags) => !allowedTags || allowedTags.includes(v),
 *   },
 * };
 * const { getValidatedParams, setValidationContext } = useQueryStringValidate(schema);
 *
 * // 서버 데이터 도착 후 컨텍스트 설정
 * useEffect(() => {
 *   if (tags) {
 *     setValidationContext(['all', ...tags.map(t => t.code)]);
 *   }
 * }, [tags]);
 *
 * // 3. Schema Factory 패턴 (권장)
 * const createSchema = (allowedTags?: string[]) => ({
 *   defaultValues: { page: 1, tag: 'all' },
 *   validators: {
 *     page: (v) => v > 0,
 *     tag: (v) => !allowedTags || allowedTags.includes(v),
 *   },
 * });
 * const schema = useMemo(() => createSchema(tags), [tags]);
 * const { getValidatedParams } = useQueryStringValidate(schema);
 */
function useQueryStringValidate<T extends Record<string, unknown>, C = unknown>(
  schema: DynamicQueryStringSchema<T, C> | QueryStringSchema<T>,
) {
  const { defaultValues, validators } = schema;
  const { mergeQuery, getQueryParamAs } = useQueryString();

  // 동적 검증을 위한 컨텍스트 ref
  const validationContextRef = useRef<C | undefined>(undefined);

  /**
   * 동적 검증을 위한 컨텍스트를 설정합니다.
   * 서버에서 데이터를 받은 후 호출하여 검증 로직에 사용할 데이터를 주입합니다.
   *
   * @example
   * useEffect(() => {
   *   if (serverData) {
   *     setValidationContext(serverData);
   *   }
   * }, [serverData]);
   */
  const setValidationContext = useCallback((context: C) => {
    validationContextRef.current = context;
  }, []);

  /**
   * 값을 검증합니다. 컨텍스트가 있으면 validator에 전달합니다.
   */
  const validateValue = useCallback(
    <K extends keyof T>(key: K, value: T[K]): boolean => {
      const validator = validators?.[key] as ValidatorFn<T[K], C> | undefined;
      if (!validator) return true;
      return validator(value, validationContextRef.current);
    },
    [validators],
  );

  /**
   * 쿼리 파라미터를 검증 후 업데이트합니다.
   * 검증 실패 시 defaultValue로 업데이트됩니다.
   */
  const onQueryParamUpdate = useCallback(
    async <K extends keyof T>(key: K, value: T[K], options?: MergeQueryOptions): Promise<void> => {
      const isValid = validateValue(key, value);
      const validValue = isValid ? value : defaultValues[key];

      await mergeQuery(
        {
          [key as string]: `${validValue}`,
        },
        options,
      );
    },
    [validateValue, defaultValues, mergeQuery],
  );

  /**
   * 검증된 단일 쿼리 파라미터를 반환합니다.
   */
  const getValidatedParams = useCallback(
    <K extends keyof T>(key: K): T[K] => {
      const defaultValue = defaultValues[key];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const value = getQueryParamAs(String(key), typeof defaultValue as any, defaultValue as any);
      const isValid = validateValue(key, value as T[K]);
      return (isValid ? value : defaultValue!) as T[K];
    },
    [defaultValues, getQueryParamAs, validateValue],
  );

  /**
   * 검증된 모든 쿼리 파라미터를 객체로 반환합니다.
   */
  const getAllValidatedParams = useCallback((): T => {
    const params = {} as T;
    (Object.keys(defaultValues) as Array<keyof T>).forEach((key) => {
      params[key] = getValidatedParams(key);
    });
    return params;
  }, [defaultValues, getValidatedParams]);

  /**
   * 검증된 쿼리 스트링을 문자열로 반환합니다.
   */
  const getValidatedQueryString = useCallback(
    (includeQuestionMark = true): string => {
      const params = getAllValidatedParams();
      const searchParams = new URLSearchParams();

      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          searchParams.append(key, String(value));
        }
      });

      const queryString = searchParams.toString();
      return queryString ? (includeQuestionMark ? `?${queryString}` : queryString) : "";
    },
    [getAllValidatedParams],
  );

  /**
   * 여러 쿼리 파라미터를 한번에 검증 후 업데이트합니다.
   */
  const updateMultipleParams = useCallback(
    async (params: Partial<T>): Promise<void> => {
      const validatedParams: Record<string, string> = {};

      for (const [key, value] of Object.entries(params)) {
        const isValid = validateValue(key as keyof T, value as T[keyof T]);
        const defaultValue = defaultValues[key as keyof T];
        const validValue = isValid ? value : defaultValue;
        validatedParams[key] = `${validValue}`;
      }

      await mergeQuery(validatedParams);
    },
    [validateValue, defaultValues, mergeQuery],
  );

  /**
   * 모든 쿼리 파라미터를 기본값으로 초기화합니다.
   */
  const resetToDefaults = useCallback(async (): Promise<void> => {
    const params: Record<string, string> = {};

    for (const [key, value] of Object.entries(defaultValues)) {
      if (value !== undefined && value !== null && value !== "") {
        params[key] = `${value}`;
      }
    }

    await mergeQuery(params);
  }, [defaultValues, mergeQuery]);

  return useMemo(
    () => ({
      onQueryParamUpdate,
      getValidatedParams,
      getAllValidatedParams,
      getValidatedQueryString,
      updateMultipleParams,
      resetToDefaults,
      /** 동적 검증을 위한 컨텍스트 설정 */
      setValidationContext,
    }),
    [
      onQueryParamUpdate,
      getValidatedParams,
      getAllValidatedParams,
      getValidatedQueryString,
      updateMultipleParams,
      resetToDefaults,
      setValidationContext,
    ],
  );
}

export default useQueryStringValidate;
