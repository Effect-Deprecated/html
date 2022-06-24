import { concreteHole } from "@effect/html/data/Hole/operations/_internal/InternalHole"

/**
 * @tsplus fluent ets/Hole updateValuesEffect
 */
export function updateValuesEffect<R, E>(
  self: Hole,
  fa: (as: Array<unknown>) => Effect<R, E, Array<unknown>>
): Effect<R, E, void> {
  concreteHole(self)
  return self.values.updateEffect(fa)
}
