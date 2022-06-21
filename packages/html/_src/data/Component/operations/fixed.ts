/**
 * @tsplus getter ets/Component fixed
 */
export function fixed(self: Component) {
  return (hole: Hole) => self.unroll(hole)
}
