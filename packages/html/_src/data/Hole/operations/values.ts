import { concreteHole } from "@effect/html/data/Hole/operations/_internal/InternalHole"

/**
 * @tsplus getter ets/Hole values
 */
export function values(self: Hole): Effect.UIO<Array<unknown>> {
  concreteHole(self)
  return self.values.get()
}
