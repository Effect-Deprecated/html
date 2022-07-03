import { concretePortal } from "@effect/html/data/Portal/operations/_internal/InternalPortal"

/**
 * as html and svg can be nested calls, but no parent portal is known
 * until rendered somewhere, the unroll operation is needed to
 * discover what to do with each interpolation, which will result
 * into an update operation.
 *
 * @tsplus fluent effect/html/Portal unroll
 */
export function unroll(
  self: Portal,
  interpolation: Interpolation
): Wire | Node {
  concretePortal(self)
  const entry = self.getEntry(interpolation)

  // even if the fragment and its nodes is not live yet,
  // it is already possible to update via unrolled interpolation values.
  entry.update(self.unrollValues(interpolation.values))

  // if the entry was new, or representing a different template or type,
  // create a new persistent entity to use during diffing.
  // This is simply a DOM node, when the template has a single container,
  // as in `<p></p>`, or a "wire" in `<p></p><p></p>` and similar cases.
  return entry.toWire
}
