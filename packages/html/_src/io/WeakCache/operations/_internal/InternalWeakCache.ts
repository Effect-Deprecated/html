import { _K, _V, WeakCacheSym } from "@effect/html/io/WeakCache/definition"

export class InternalWeakCache<K extends object, V> implements WeakCache<K, V> {
  readonly [WeakCacheSym]: WeakCacheSym = WeakCacheSym
  readonly [_K]!: () => K
  readonly [_V]!: () => V
  constructor(readonly ref: SynchronizedRef<WeakMap<K, V>>) {}
}

/**
 * @tsplus macro remove
 */
export function concreteWeakCache<K extends object, V>(
  _: WeakCache<K, V>
): asserts _ is InternalWeakCache<K, V> {
  //
}
