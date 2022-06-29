import { concreteHole } from "@effect/html/data/Hole/operations/_internal/InternalHole"

/**
 * @tsplus getter effect/html/Hole values
 */
export function values<R, E>(
  self: Hole
): Chunk<Placeholder.Value> {
  concreteHole(self)
  return self.values.toChunk
}
