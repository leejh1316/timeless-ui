/**
 * 1. 타입 정의
 * 스키마의 각 필드가 어떤 형태인지 정의합니다.
 */

// A. 단순 텍스트 추출 (예: 'div.title')
type StringSelector = string;

// B. 속성 추출 또는 고급 설정 (예: { selector: 'img', attr: 'src' })
type AttributeSelector = {
  selector: string;
  attr?: string; // 없으면 textContent
  trim?: boolean;
};

// C. 커스텀 변환 함수 (예: 가격 문자열 -> 숫자 변환)
type TransformSelector<R> = {
  selector: string;
  transform: (element: Element | null) => R;
};

// D. 리스트 추출 (배열)
type ListSelector<S> = {
  listItem: string;
  data: S; // 재귀적 스키마
};

// E. 전체 스키마 정의 (중첩 가능)
export interface ScrapeSchema {
  [key: string]:
    | StringSelector
    | AttributeSelector
    | TransformSelector<any>
    | ListSelector<ScrapeSchema>
    | ScrapeSchema; // 단순 중첩 객체
}

/**
 * 2. 마법의 타입 추론 (Conditional Type)
 * 입력된 Schema(T)를 분석하여 반환될 Result 타입을 자동으로 만들어냅니다.
 */
export type ScrapedResult<T extends ScrapeSchema> = {
  [K in keyof T]: T[K] extends StringSelector
    ? string
    : T[K] extends AttributeSelector
      ? string
      : T[K] extends TransformSelector<infer R>
        ? R
        : T[K] extends ListSelector<infer S>
          ? ScrapedResult<S>[]
          : T[K] extends ScrapeSchema
            ? ScrapedResult<T[K]> // 중첩 객체 처리
            : never;
};

/**
 * 3. 메인 함수 구현
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

    // 1. 단순 문자열 셀렉터 ('div.title')
    if (typeof def === "string") {
      const el = root.querySelector(def);
      result[key] = el?.textContent?.trim() || "";
    }
    // 2. 리스트 아이템 ({ listItem: 'li', data: ... })
    else if ("listItem" in def) {
      const items = root.querySelectorAll(def.listItem);
      result[key] = Array.from(items).map((el) => scrape(el, def.data));
    }
    // 3. 변환 함수 ({ selector: 'div', transform: (el) => ... })
    else if ("transform" in def) {
      const el = root.querySelector(def.selector);
      result[key] = def.transform(el);
    }
    // 4. 속성 추출 ({ selector: 'img', attr: 'src' })
    else if ("attr" in def) {
      const el = root.querySelector(def.selector);
      const val = el?.getAttribute(def.attr || "") || el?.textContent || "";
      result[key] = def.trim !== false ? val.trim() : val;
    }
    // 5. 중첩 객체 (단순 구조화를 위한 그룹핑)
    else {
      // 현재 root 컨텍스트를 유지한 채 재귀 호출
      result[key] = scrape(root, def as ScrapeSchema);
    }
  }

  return result;
}
