/**
 * @tsplus static ets/WeakCache/Ops make
 * @tsplus static ets/WeakCache/Ops __call
 */
export function make<Entries extends Tuple<[any, any]>[]>(
  ...entries: Entries
): Effect.UIO<
  WeakCache<
    Entries[number] extends Tuple<[infer K, any]> ? K extends object ? K : never : never,
    Entries[number] extends Tuple<[any, infer V]> ? V : never
  >
> {
  return WeakCache.from(entries)
}
