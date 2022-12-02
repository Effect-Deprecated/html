import { concreteInterpolation } from "@effect/html/data/Interpolation/operations/_internal/InternalInterpolation"

const empty = /^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i
const elements = /<([a-z]+[a-z0-9:._-]*)([^>]*?)(\/?)>/g
// eslint-disable-next-line no-control-regex
const attributes = /([^\s\\>"'=]+)\s*=\s*(['"]?)\x01/g
// eslint-disable-next-line no-control-regex
const interpolations = /[\x01\x02]/g
// eslint-disable-next-line no-control-regex
const directives = /(<\w+[^>]*)(\x01)/g

// \x01 Node.ELEMENT_NODE
// \x02 Node.ATTRIBUTE_NODE

/**
 * Given a template, find interpolations as both nodes and attributes and
 * return a string with interpolations as either comment nodes or named attributes.
 *
 * @tsplus getter effect/html/Interpolation instrument
 */
export function instrument(
  self: Interpolation
): string {
  concreteInterpolation(self)
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
      directives,
      (_, element, node) => `${element}${Interpolation.PREFIX}${i++}`
    )
    .replace(
      interpolations,
      interpolation =>
        interpolation === "\x01" ?
          `<!--${Interpolation.PREFIX}${i++}-->` :
          `${Interpolation.PREFIX}${i++}`
    )
}
