/**
 * @tsplus static effect/html/Many/Ops __call
 */
export function make<A extends Array<Placeholder<any>>>(
  ...placeholders: A
): Effect<Placeholder.Env<A>, never, Many> {
  return Many.from(placeholders)
}
