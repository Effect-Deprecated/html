/**
 * @tsplus static effect/html/WeakCache/Ops make
 * @tsplus static effect/html/WeakCache/Ops __call
 */
export function make<Entries extends Tuple<[any, any]>[]>(
  ...entries: Entries
): WeakCache<
  Entries[number] extends Tuple<[infer K, any]> ? K extends object ? K : never : never,
  Entries[number] extends Tuple<[any, infer V]> ? V : never
> {
  return WeakCache.from(entries)
}
