/**
 * @tsplus static effect/html/Many/Ops empty
 */
export function empty(): Effect<never, never, Many> {
  return Many.from(Array.empty<Placeholder<never>>())
}
