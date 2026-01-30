import type { QueryParamType } from "./types";

/**
 * 값이 비어있는지 확인합니다. (null, undefined, 빈 문자열)
 */
export const isEmpty = (value: string | null | undefined): boolean => {
  return value === null || value === undefined || value === "";
};

/**
 * 쿼리 파라미터 값을 지정된 타입으로 변환합니다.
 */
export const parseQueryValue = (
  value: string | null,
  type: QueryParamType,
  defaultValue?: string | number | boolean,
): string | number | boolean => {
  if (value === null) {
    return defaultValue ?? (type === "number" ? 0 : type === "boolean" ? false : "");
  }

  switch (type) {
    case "number": {
      const parsed = Number(value);
      return isNaN(parsed) ? ((defaultValue as number) ?? 0) : parsed;
    }
    case "boolean": {
      if (value === "true" || value === "1") return true;
      if (value === "false" || value === "0") return false;
      return (defaultValue as boolean) ?? false;
    }
    case "string":
    default:
      return value;
  }
};
