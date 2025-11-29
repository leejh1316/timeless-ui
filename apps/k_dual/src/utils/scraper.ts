/**
 * Scraper Utility
 * HTML 문서를 스키마 기반으로 파싱하여 구조화된 데이터를 추출합니다.
 */

// 1. Selector Types

/** 단순 텍스트 추출 (예: 'div.title') */
export type StringSelector = string;

/** 속성 추출 (예: { selector: 'img', attr: 'src' }) */
export interface AttributeSelector {
  selector: string;
  attr: string; // 명시적으로 속성명을 요구하여 모호성 제거
  trim?: boolean;
}

/** 텍스트 추출 + 옵션 (예: { selector: 'div', as: 'text' }) */
export interface TextSelector {
  selector: string;
  as: "text"; // 명시적 구분자
  trim?: boolean;
}

/** 커스텀 변환 함수 (예: 가격 문자열 -> 숫자 변환) */
export interface TransformSelector<R = any> {
  selector: string;
  transform: (element: Element | null) => R;
  attr?: string; // 메타데이터나 문서화를 위해 허용
}

/** 리스트 추출 (배열) */
export interface ListSelector<S extends ScrapeSchema> {
  listItem: string;
  data: S;
}

/** 전체 스키마 정의 (중첩 가능) */
export interface ScrapeSchema {
  [key: string]:
    | StringSelector
    | AttributeSelector
    | TextSelector
    | TransformSelector<any>
    | ListSelector<ScrapeSchema>
    | ScrapeSchema; // 중첩 객체
}

// 2. Type Guards (Runtime Checks)

function isListSelector(def: any): def is ListSelector<any> {
  return typeof def === "object" && def !== null && "listItem" in def && "data" in def;
}

function isTransformSelector(def: any): def is TransformSelector<any> {
  return (
    typeof def === "object" &&
    def !== null &&
    "transform" in def &&
    typeof def.transform === "function"
  );
}

function isAttributeSelector(def: any): def is AttributeSelector {
  return typeof def === "object" && def !== null && "selector" in def && "attr" in def;
}

function isTextSelector(def: any): def is TextSelector {
  return typeof def === "object" && def !== null && "selector" in def && def.as === "text";
}

// 3. Result Type Inference

export type ScrapedResult<T extends ScrapeSchema> = {
  [K in keyof T]: T[K] extends StringSelector
    ? string
    : T[K] extends ListSelector<infer S>
      ? ScrapedResult<S>[]
      : T[K] extends TransformSelector<infer R>
        ? R
        : T[K] extends TextSelector
          ? string
          : T[K] extends AttributeSelector
            ? string
            : T[K] extends ScrapeSchema
              ? ScrapedResult<T[K]>
              : never;
};

/**
 * 4. Main Function
 * @param root - 검색을 시작할 Document 또는 Element
 * @param schema - 데이터 구조 정의
 */
export function scrape<T extends ScrapeSchema>(
  root: Document | Element,
  schema: T,
): ScrapedResult<T> {
  const result: any = {};

  for (const key in schema) {
    const def = schema[key];

    // 1. String Selector
    if (typeof def === "string") {
      if (def === ":scope") {
        result[key] = root.textContent?.trim() || "";
      } else {
        const el = root.querySelector(def);
        result[key] = el?.textContent?.trim() || "";
      }
    }
    // 2. List Selector
    else if (isListSelector(def)) {
      const items = root.querySelectorAll(def.listItem);
      result[key] = Array.from(items).map((el) => scrape(el, def.data));
    }
    // 3. Transform Selector
    else if (isTransformSelector(def)) {
      const el = def.selector === ":scope" ? (root as Element) : root.querySelector(def.selector);
      result[key] = def.transform(el);
    }
    // 4. Attribute Selector
    else if (isAttributeSelector(def)) {
      const el = def.selector === ":scope" ? (root as Element) : root.querySelector(def.selector);
      const val = el?.getAttribute(def.attr) || "";
      result[key] = def.trim !== false ? val.trim() : val;
    }
    // 5. Text Selector (Explicit)
    else if (isTextSelector(def)) {
      const el = def.selector === ":scope" ? (root as Element) : root.querySelector(def.selector);
      const val = el?.textContent || "";
      result[key] = def.trim !== false ? val.trim() : val;
    }
    // 6. Nested Schema (Fallback)
    else if (typeof def === "object" && def !== null) {
      result[key] = scrape(root, def as ScrapeSchema);
    }
  }

  return result;
}
