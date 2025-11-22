import { useEffect, useMemo, useRef, useState, startTransition } from "react";
import type { NavigateOptions } from "react-router";
import { useQueryString } from "./useQueryString";

/** 탭 아이템 정의 */
export type TabItem<Id extends string = string, Val extends string = string> = {
  id: Id; // URL 파라미터에 들어갈 안정적인 식별자
  label?: string; // UI 라벨(선택)
  value?: Val; // id대신 로직에서 쓸 값(선택, 기본은 id)
  disabled?: boolean; // 비활성 탭(선택)
};

type UrlSyncOption =
  | boolean
  | {
      /** react-router setSearchParams 의 replace 플래그 (기본 false: 히스토리 누적 방지) */
      replace?: boolean;
      /** 기존 쿼리를 유지하며 병합할지(기본 true). false면 paramKey만 보존한 채 교체 */
      merge?: boolean;
      /** 빈 URL일 때 초기값을 파라미터로 채울지(기본 true) */
      seedWhenEmpty?: boolean;
    };

export type UseTabsOptions<Id extends string = string> = {
  /** URL 쿼리 파라미터 키 (기본 "tab") */
  paramKey?: string;
  /** 초기 선택 탭 id (기본: 첫 번째 아이템) */
  initialId?: Id;
  /**
   * URL 동기화 설정 (기본값 true와 동일한 { replace:true, merge:true, seedWhenEmpty:true })
   * - true  : (enabled) 기본 정책으로 동기화
   * - false : (disabled) URL을 사용하지 않음(standalone)
   * - object: 각 속성을 세밀하게 제어
   */
  urlSync?: UrlSyncOption;
  /** URL에서 읽은 값이 탭에 없으면 initial로 보정 (기본 true) */
  validateFromUrl?: boolean;
  /** 최초 마운트 시 onChange 실행 여부 (기본 true) */
  emitOnInit?: boolean;
  /** 탭 변경 콜백 */
  onChange?: (next: { id: Id; value: string; index: number; prevId: Id | null }) => void;
};

export type UseTabsReturn<T extends readonly TabItem<any, any>[], Id extends string = Extract<T[number]["id"], string>> = {
  /** 현재 활성 탭 id */
  tab: Id;
  /** 활성 탭 변경 */
  setTab: (nextId: Id, navOptions?: NavigateOptions) => void;
  /** 현재 탭의 value (정의되지 않았으면 id 문자열 반환) */
  value: string;
  /** 현재 인덱스 */
  index: number;
  /** 특정 id가 활성인지 여부 */
  isActive: (testId: Id) => boolean;
  /** 다음 탭으로 이동(순환). disabled 탭은 건너뜀 */
  next: () => void;
  /** 이전 탭으로 이동(순환). disabled 탭은 건너뜀 */
  prev: () => void;
  /** 두 탭 사이 토글 (현재가 a면 b, b면 a, 둘 다 아니면 a) */
  toggle: (a: Id, b: Id) => void;
  /** 입력 배열 */
  items: T;
  /** 라벨 조회: id → label */
  getLabel: (forId: Id) => string | undefined;
  /** 값 조회: id → value (fallback: id) */
  getValue: (forId: Id) => string;
};

/**
 *
 * =========================
 *
 * 사용 예시
 *
 * -------------------------
 * @example
 * const { tab, setTab, items } = useTabs(
 *   [
 *     { id: "visit", label: "입장현황" },
 *     { id: "sales", label: "판매현황" },
 *   ] as const,
 *   {
 *     paramKey: "status-tab",
 *     initialId: "visit",
 *     urlSync: { replace: true, merge: true, seedWhenEmpty: true },
 *     emitOnInit: true,
 *     onChange: ({ id, index }) => console.log("changed:", id, index),
 *   },
 * );
 * */
export function useTabs<const T extends readonly TabItem<string, string>[]>(
  /** 탭 정의(권장: `as const`) */
  tabs: T,
  options: UseTabsOptions<Extract<T[number]["id"], string>> = {},
): UseTabsReturn<T, Extract<T[number]["id"], string>> {
  /** 탭 ID 유니온 타입을 탭 배열로부터 추출 */
  type Id = Extract<T[number]["id"], string>;

  /** 옵션 기본값 정리 */
  const {
    paramKey = "tab",
    initialId,
    urlSync = { replace: true, merge: true, seedWhenEmpty: true },
    validateFromUrl = true,
    emitOnInit = true,
    onChange,
  } = options as UseTabsOptions<Id>;

  /** urlSync를 항상 객체 형태로 정규화 */
  const urlCfg =
    typeof urlSync === "boolean"
      ? { enabled: urlSync, replace: true, merge: true, seedWhenEmpty: true }
      : { enabled: true, replace: true, merge: true, seedWhenEmpty: true, ...urlSync };

  /** 입력 배열 그대로 items로 사용(타입 보존) */
  const items = tabs;

  /** 빠른 조회를 위한 맵과 순서 배열 (렌더당 재계산 방지) */
  const byId = useMemo(() => {
    const m = new Map<Id, TabItem<Id>>();
    for (const t of items) m.set(t.id as Id, t as TabItem<Id>);
    return m;
  }, [items]);

  const orderedIds = useMemo<Id[]>(() => items.map((t) => t.id as Id), [items]);

  /** 쿼리스트링 유틸 */
  const { getQueryParam, appendQueryParam, appendQueryObjectParams, updateQueryParam, replaceQueryParam, hasQueryParam } = useQueryString<
    string,
    Record<string, string>
  >();

  /** URL에서 현재 선택 후보 읽기 (Sync ON일 때만) */
  const urlId = (urlCfg.enabled ? getQueryParam(paramKey) : null) as Id | null;

  /** 안전한 초기 id 결정 로직
   * - URL Sync ON + URL에 값 있음: URL 우선
   * - URL 값이 유효하지 않으면 validateFromUrl=true인 경우 initial 또는 첫 탭으로 보정
   * - 그 외엔 initialId → 첫 탭 순으로 폴백
   */
  const computedInitialId: Id = useMemo(() => {
    const fallback = (initialId ?? orderedIds[0]) as Id | undefined;
    if (!fallback) throw new Error("useTabs: tabs가 비어 있습니다. 최소 1개 이상의 탭을 제공하세요.");
    const candidate = urlCfg.enabled && urlId ? urlId : fallback;
    if (validateFromUrl && urlCfg.enabled && urlId && !byId.has(urlId)) {
      return fallback;
    }
    return candidate;
  }, [urlCfg.enabled, urlId, initialId, orderedIds, byId, validateFromUrl]);

  /** 내부 상태
   * - URL Sync ON일 때는 setId가 상태를 직접 변경하지 않으므로
   *   상태 변경은 아래 URL→상태 동기화 useEffect에서만 발생한다(단일 경로).
   */
  const [id, _setId] = useState<Id>(computedInitialId);

  /** onChange 중복 방지 및 prev 추적용 ref
   * - prevIdRef: 이전에 확정된 id (콜백에 전달)
   * - announcedIdRef: 마지막으로 onChange에 통지한 id (중복 호출 방지)
   * - didMountRef: 최초 마운트 여부(emitOnInit 제어)
   */
  const prevIdRef = useRef<Id | null>(null);
  const announcedIdRef = useRef<Id | null>(null);
  const didMountRef = useRef(false);

  /** URL 초기 시드
   * - URL Sync ON + seedWhenEmpty=true + 해당 파라미터 없음 → 초기값을 심어준다.
   * - merge=true : 기존 쿼리를 보존하고 병합
   * - merge=false: 해당 파라미터만 남기고 교체
   */
  useEffect(() => {
    if (!urlCfg.enabled) return;
    const exists = hasQueryParam(paramKey);
    if (!exists && urlCfg.seedWhenEmpty) {
      if (urlCfg.merge) {
        appendQueryParam(paramKey, computedInitialId, { replace: urlCfg.replace });
      } else {
        replaceQueryParam({ [paramKey]: computedInitialId }, { replace: urlCfg.replace });
      }
    }
  }, [urlCfg.enabled, urlCfg.seedWhenEmpty, urlCfg.merge, urlCfg.replace, paramKey]);

  /** URL → 상태 동기화
   * - 주소창 수동 변경/뒤로가기 등 모든 URL 변화를 단일 경로로 상태에 반영.
   * - 잘못된 값(목록에 없는 id)이면 validateFromUrl=true일 때 초기값으로 보정하여 URL도 수정.
   * - 동일값일 경우 set 생략하여 불필요한 렌더 방지.
   */
  useEffect(() => {
    if (!urlCfg.enabled) return;
    const p = getQueryParam(paramKey) as Id | null;
    if (!p) return;

    // 잘못된 값 처리
    if (!byId.has(p)) {
      if (!validateFromUrl) return;
      const next = computedInitialId;
      if (id !== next) _setId(next);
      if (p !== next) updateQueryParam(paramKey, next, { replace: urlCfg.replace });
      return;
    }

    // 정상 값 처리
    if (id !== p) _setId(p);
  }, [urlCfg.enabled, paramKey, byId, validateFromUrl, computedInitialId, urlCfg.replace, getQueryParam, id]);

  /** onChange 알림
   * - emitOnInit=false인 경우 최초 렌더에서는 onChange를 호출하지 않음.
   */
  useEffect(() => {
    if (!onChange) return;

    if (!didMountRef.current) {
      didMountRef.current = true;
      if (!emitOnInit) {
        announcedIdRef.current = id;
        prevIdRef.current = id;
        return;
      }
    }

    if (announcedIdRef.current === id) return; // 같은 값이면 중복 호출 방지
    const prev = prevIdRef.current;
    announcedIdRef.current = id;
    prevIdRef.current = id;

    const idx = orderedIds.indexOf(id);
    const v = byId.get(id)?.value ?? id;
    onChange({ id, value: String(v), index: idx, prevId: prev });
  }, [id, onChange, emitOnInit, orderedIds, byId]);

  /** setId
   * - URL Sync ON: URL만 갱신(상태는 URL→상태 effect에서 반영)
   * - URL Sync OFF: 상태를 직접 갱신(startTransition으로 렌더 우선순위 완화)
   */
  const setId = (nextId: Id, navOptions?: NavigateOptions) => {
    if (!byId.has(nextId)) return;
    if (byId.get(nextId)?.disabled) return;

    if (urlCfg.enabled) {
      const opts = { replace: urlCfg.replace, ...(navOptions ?? {}) };
      if (urlCfg.merge) {
        appendQueryObjectParams({ [paramKey]: nextId }, opts);
      } else {
        replaceQueryParam({ [paramKey]: nextId }, opts);
      }
    } else {
      // URL sync OFF: 상태 직접 갱신(transition으로 렌더 우선순위 완화)
      startTransition(() => _setId(nextId));
    }
  };

  /** 헬퍼들 */
  const isActive = (testId: Id) => id === testId;
  const index = orderedIds.indexOf(id);

  /** 다음 활성 탭 (순환) */
  const next = () => {
    if (orderedIds.length <= 1) return;
    const start = index < 0 ? 0 : index;
    for (let i = 1; i <= orderedIds.length; i++) {
      const cand = orderedIds[(start + i) % orderedIds.length];
      if (!byId.get(cand)?.disabled) {
        setId(cand);
        break;
      }
    }
  };

  /** 이전 활성 탭 (순환) */
  const prev = () => {
    if (orderedIds.length <= 1) return;
    const start = index < 0 ? 0 : index;
    for (let i = 1; i <= orderedIds.length; i++) {
      const cand = orderedIds[(start - i + orderedIds.length) % orderedIds.length];
      if (!byId.get(cand)?.disabled) {
        setId(cand);
        break;
      }
    }
  };

  const toggle = (a: Id, b: Id) => {
    if (id === a) setId(b);
    else if (id === b) setId(a);
    else setId(a);
  };

  const getLabel = (forId: Id) => byId.get(forId)?.label;
  const getValue = (forId: Id) => String(byId.get(forId)?.value ?? forId);

  return {
    tab: id,
    setTab: setId,
    value: getValue(id),
    index,
    isActive,
    next,
    prev,
    toggle,
    items,
    getLabel,
    getValue,
  };
}
