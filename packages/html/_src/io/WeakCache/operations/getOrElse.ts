/**
 * @tsplus fluent effect/html/WeakCache getOrElse
 */
export function getOrElse<K extends object, V, A>(self: WeakCache<K, V>, k: K, f: LazyArg<A>): V | A {
  const value = self.get(k)

  return value == null ? f() : value
}
