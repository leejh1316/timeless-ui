/**
 * Scraper Utility
 * HTML 문서를 스키마 기반으로 파싱하여 구조화된 데이터를 추출합니다.
 */

// Selector Types

/** 단순 텍스트 추출 (예: 'div.title') */
export type StringSelector = string;

/** 속성 추출 (예: { selector: 'img', attr: 'src' }) */
export interface AttributeSelector {
  selector: string;
  attr: string;
  trim?: boolean;
}

/** 텍스트 추출 + 옵션 (예: { selector: 'div', as: 'text' }) */
export interface TextSelector {
  selector: string;
  as: "text";
  trim?: boolean;
}

/** 커스텀 변환 함수 (예: 가격 문자열 -> 숫자 변환) */
export interface TransformSelector<R = any> {
  selector: string;
  transform: (element: Element | null, root?: Document | Element) => R;
}

/** 리스트 추출 (배열) */
export interface ListSelector<S extends ScrapeSchema | ":scope"> {
  listItem: string;
  data: S;
}

/** 전체 스키마 정의 (중첩 가능) */
export type ScrapeSchema<T extends Record<string, any> = Record<string, any>> = {
  [K in keyof T]: T[K] extends string
    ? StringSelector
    : T[K] extends ListSelector<infer S>
      ? ListSelector<S>
      : T[K] extends TransformSelector<infer R>
        ? TransformSelector<R>
        : T[K] extends TextSelector
          ? TextSelector
          : T[K] extends AttributeSelector
            ? AttributeSelector
            : T[K] extends ScrapeSchema
              ? ScrapeSchema<T[K]>
              : never;
};

// Type Guards
function isListSelector(def: any): def is ListSelector<any> {
  return typeof def === "object" && def !== null && "listItem" in def && "data" in def;
}

function isTransformSelector(def: any): def is TransformSelector<any> {
  return typeof def === "object" && def !== null && "transform" in def && typeof def.transform === "function";
}

function isAttributeSelector(def: any): def is AttributeSelector {
  return typeof def === "object" && def !== null && "selector" in def && "attr" in def;
}

function isTextSelector(def: any): def is TextSelector {
  return typeof def === "object" && def !== null && "selector" in def && def.as === "text";
}

// Result Type
export type ScrapedResult<T extends ScrapeSchema> = {
  [K in keyof T]: T[K] extends StringSelector
    ? string
    : T[K] extends ListSelector<infer S>
      ? Array<S extends ScrapeSchema ? ScrapedResult<S> : string>
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
 * Main Function
 * @param root - 검색을 시작할 Document 또는 Element
 * @param schema - 데이터 구조 정의
 */
export function scrape<T extends ScrapeSchema>(root: Document | Element, schema: T): ScrapedResult<T> {
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
      if (def.data === ":scope") {
        result[key] = Array.from(items).map((el) => el.textContent?.trim() || "");
      } else {
        result[key] = Array.from(items).map((el) => scrape(el, def.data as ScrapeSchema));
      }
    }
    // 3. Transform Selector
    else if (isTransformSelector(def)) {
      const el = def.selector === ":scope" ? (root as Element) : root.querySelector(def.selector);
      result[key] = def.transform(el, root);
    }
    // 4. Attribute Selector
    else if (isAttributeSelector(def)) {
      const el = def.selector === ":scope" ? (root as Element) : root.querySelector(def.selector);
      const val = el?.getAttribute(def.attr) || "";
      result[key] = def.trim !== false ? val.trim() : val;
    }
    // 5. Text Selector
    else if (isTextSelector(def)) {
      const el = def.selector === ":scope" ? (root as Element) : root.querySelector(def.selector);
      const val = el?.textContent || "";
      result[key] = def.trim !== false ? val.trim() : val;
    }
    // 6. Nested Schema (Fallback)
    else if (typeof def === "object" && def !== null) {
      // 객체 리터럴인지 확인하여 스키마로 간주 (selector 또는 listItem이 있는 경우 schema로 간주)
      const isObject = Object.getPrototypeOf(def) === Object.prototype;
      const isNestedSchema = isObject && !("selector" in def) && !("listItem" in def);
      if (isNestedSchema) {
        result[key] = scrape(root, def as ScrapeSchema);
      } else {
        console.warn("[scrape]: 스키마 정의가 올바르지 않습니다:", key, def);
        result[key] = null; // 정의되지 않은 형태는 null로 처리
      }
    }
  }

  return result;
}
