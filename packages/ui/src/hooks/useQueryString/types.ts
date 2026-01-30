import { NavigateOptions } from "react-router";

// --- 기본 타입 ---
export type QueryParamType = "string" | "number" | "boolean";

// --- Options 타입 ---
export interface SetQueryParamOptions extends NavigateOptions {
  /** 빈 문자열일 경우 URL에서 해당 키를 제거합니다. (기본값: false) */
  skipEmpty?: boolean;
}

export interface MergeQueryOptions extends NavigateOptions {
  /** 빈 문자열인 값들을 URL에서 제거합니다. (기본값: true) */
  skipEmpty?: boolean;
}

// --- 배치 처리 관련 타입 ---
export interface QueryUpdateEvent {
  params: Record<string, string>;
  options?: MergeQueryOptions;
  resolve: () => void;
}

// --- Validation 관련 타입 ---

/**
 * Validator 함수 타입
 * - 단순 함수: (value) => boolean
 * - 동적 함수: (value, context) => boolean (서버 데이터 등 외부 컨텍스트 참조 가능)
 */
export type ValidatorFn<T, C = unknown> = (value: T, context?: C) => boolean;

/**
 * 기본 스키마 타입 (정적 validators)
 */
export type QueryStringSchema<T extends Record<string, unknown>> = {
  defaultValues: Partial<T>;
  validators?: Partial<{
    [K in keyof T]: ValidatorFn<T[K]>;
  }>;
};

/**
 * 동적 스키마 타입 (컨텍스트 기반 validators)
 * 서버 데이터를 컨텍스트로 받아 검증에 사용할 수 있습니다.
 */
export type DynamicQueryStringSchema<T extends Record<string, unknown>, C = unknown> = {
  defaultValues: Partial<T>;
  validators?: Partial<{
    [K in keyof T]: ValidatorFn<T[K], C>;
  }>;
};

/**
 * 스키마 팩토리 함수 타입
 * 서버 데이터를 받아 동적으로 스키마를 생성합니다.
 *
 * @example
 * const createHth01Schema: SchemaFactory<QueryString, string[]> = (allowedTags) => ({
 *   defaultValues: { page: 1, tag: 'all' },
 *   validators: {
 *     page: (v) => v > 0,
 *     tag: (v) => !allowedTags || allowedTags.includes(v),
 *   },
 * });
 */
export type SchemaFactory<T extends Record<string, unknown>, C = unknown> = (context?: C) => QueryStringSchema<T>;

// --- Context 타입 ---
export interface QueryStringContextValue {
  /** (읽기 전용) 원본 URLSearchParams 객체 */
  queryString: URLSearchParams;
  /** (읽기 전용) 원본 setSearchParams 함수 */
  setQueryString: ReturnType<typeof import("react-router").useSearchParams>[1];

  // Getters
  getQueryParam: (key: string) => string | null;
  getQueryParamAs: {
    (key: string, type: "string", defaultValue?: string): string;
    (key: string, type: "number", defaultValue?: number): number;
    (key: string, type: "boolean", defaultValue?: boolean): boolean;
  };
  getQueryParamAll: (key: string) => string[];
  getQueryObject: () => Record<string, string>;
  hasQueryParam: (key: string, value?: string) => boolean;

  // Setters (동시성 안전)
  setQueryParam: (key: string, value: string, options?: SetQueryParamOptions) => Promise<void>;
  appendQueryParam: (key: string, value: string, options?: NavigateOptions) => Promise<void>;
  removeQueryParam: (key: string, options?: NavigateOptions) => Promise<void>;
  removeQueryParamValue: (key: string, value: string, options?: NavigateOptions) => Promise<void>;

  // Object-based Setters (동시성 안전)
  setQuery: (params: Record<string, string | string[]>, options?: NavigateOptions) => Promise<void>;
  mergeQuery: (params: Record<string, string>, options?: MergeQueryOptions) => Promise<void>;
}
