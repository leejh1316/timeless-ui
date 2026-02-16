import { useState, useCallback } from "react";
import cloneDeep from "lodash-es/cloneDeep";

type InitialState<K, V> = Map<K, V> | [K, V][];

interface MapActions<K, V> {
  set: (key: K, value: V) => void;
  get: (key: K) => V | undefined;
  remove: (key: K) => void;

  setAll: (newMap: Map<K, V>) => void;
  clear: () => void;
  reset: () => void;

  update: (callback: (clonedMap: Map<K, V>) => void) => void;
}
export type { MapActions };

export function useMapState<K, V>(initialValue: InitialState<K, V> = new Map()): [Map<K, V>, MapActions<K, V>] {
  const [map, setMap] = useState<Map<K, V>>(() => {
    return initialValue instanceof Map ? initialValue : new Map(initialValue);
  });

  const set = useCallback((key: K, value: V) => {
    setMap((prev) => {
      const cloned = cloneDeep(prev);
      cloned.set(key, value);
      return cloned;
    });
  }, []);

  const remove = useCallback((key: K) => {
    setMap((prev) => {
      const cloned = cloneDeep(prev);
      cloned.delete(key);
      return cloned;
    });
  }, []);

  // 사용법: update(draft => draft.get('group1').set('user1', 'newVal'))
  const update = useCallback((callback: (clonedMap: Map<K, V>) => void) => {
    setMap((prev) => {
      const cloned = cloneDeep(prev);
      callback(cloned);
      return cloned;
    });
  }, []);

  // 기타 유틸리티
  const setAll = useCallback((newMap: Map<K, V>) => {
    setMap(cloneDeep(newMap));
  }, []);

  const clear = useCallback(() => {
    setMap(new Map());
  }, []);

  const reset = useCallback(() => {
    setMap(initialValue instanceof Map ? initialValue : new Map(initialValue));
  }, [initialValue]);

  // 렌더링 시기에는 map.get 사용
  const get = useCallback((key: K) => map.get(key), [map]);

  return [map, { set, get, remove, setAll, clear, reset, update }];
}
