/**
 * @tsplus getter effect/html/Component fixed
 */
export function fixed(self: Component) {
  return (hole: Hole) => self.unroll(hole)
}
