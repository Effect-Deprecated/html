import { concreteHole } from "@effect/html/data/Hole/operations/_internal/InternalHole"

const empty = /^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i
const elements = /<([a-z]+[a-z0-9:._-]*)([^>]*?)(\/?)>/g
// eslint-disable-next-line no-control-regex
const attributes = /([^\s\\>"'=]+)\s*=\s*(['"]?)\x01/g
// eslint-disable-next-line no-control-regex
const holes = /[\x01\x02]/g

/**
 * Given a template, find holes as both nodes and attributes and
 * return a string with holes as either comment nodes or named attributes.
 *
 * @tsplus getter ets/Hole instrument
 */
export function instrument(
  self: Hole
): string {
  concreteHole(self)
  let i = 0
  return self.template
    .join("\x01")
    .trim()
    .replace(
      elements,
      (_, name, attrs, selfClosing) => {
        let ml = name + attrs.replace(attributes, "\x02=$2$1").trimEnd()
        if (selfClosing.length) {
          ml += (self.isSVG || empty.test(name)) ? " /" : ("></" + name)
        }
        return "<" + ml + ">"
      }
    )
    .replace(
      holes,
      hole =>
        hole === "\x01" ?
          ("<!--" + Hole.PREFIX + i++ + "-->") :
          (Hole.PREFIX + i++)
    )
}
