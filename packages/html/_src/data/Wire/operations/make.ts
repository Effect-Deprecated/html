import { InternalWire } from "@effect/html/data/Wire/operations/_internal/InternalWire"

/**
 * @tsplus static ets/Wire/Ops __call
 */
export function make(
  fragment: ParentNode
): Effect.UIO<Wire> {
  return SynchronizedRef.make(fragment).map((_) =>
    new InternalWire(
      _,
      Chunk.from(fragment.childNodes),
      Maybe.fromNullable(fragment.firstChild),
      Maybe.fromNullable(fragment.lastChild)
    )
  )
}
