import { ref } from "@effect/html/data/Template/operations/updates"

const ca = /[&<>'"]/g

const esca = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  "'": "&#39;",
  "\"": "&quot;"
} as const

const rename = /([^\s>]+)[\s\S]*$/

/**
 * Safely escape HTML entities such as `&`, `<`, `>`, `"`, and `'`.
 * @param {string} es the input to safely escape
 * @returns {string} the escaped input, and it **throws** an error if
 *  the input type is unexpected, except for boolean and numbers,
 *  converted as string.
 */
function escape(es: string): string {
  return es.replace(ca, (m) => esca[m])
}

const interpolation = new RegExp(
  `(<!--${Interpolation.PREFIX}(\\d+)-->|\\s*${Interpolation.PREFIX}(\\d+)=([^\\s>]))`,
  "g"
)

function attribute(name: string, quote: string, value: string): string {
  return ` ${name}=${quote}${escape(value)}${quote}`
}

function getValue(value: Portal.Values): string {
  switch (typeof value) {
    case "string":
      return escape(value)
    case "boolean":
    case "number":
      return String(value)
    case "object":
      if (Array.isArray(value)) {
        return value.map(getValue).join("")
      }

      if (Interpolation.isInterpolation(value)) {
        return value.toString
      }

      break
  }

  return value == null ? "" : escape(String(value))
}

const passRef = ref(null)

/**
 * @tsplus getter effect/html/Interpolation updates
 */
export function updates(
  self: Interpolation
) {
  const html = self.instrument
  const updates: Array<Template.Update> = []
  let i = 0
  let match = interpolation.exec(html)

  while (match) {
    const pre = html.slice(i, match.index)

    i = match.index + (match[0]?.length ?? 0)

    if (match[2]) {
      updates.push((value: Portal.Values) => (pre + getValue(value)))
    } else {
      let name = ""
      let quote = match[4]!

      switch (quote) {
        case "\"":
        case "'":
          {
            const next = html.indexOf(quote, i)
            name = html.slice(i, next)
            i = next + 1
          }
          break
        default:
          name = html.slice(--i).replace(rename, "$1")
          i += name.length
          quote = "\""
          break
      }
      switch (true) {
        case name === "ref":
          updates.push((value: ElementRef) => {
            passRef(value as never)
            return pre
          })
          break
        case name[0] === "o" && name[1] === "n":
          updates.push((
            value:
              | EventListener
              | string
              | EventListenerObject
          ) => {
            let result = pre
            // allow handleEvent based objects that
            // follow the `onMethod` convention
            // allow listeners only if passed as string,
            // as functions with a special toString method,
            // as objects with handleEvents and a method

            switch (typeof value) {
              // @ts-expect-error
              case "object":
                if (!(name in value)) {
                  break
                }
                value = value[name]
                if (typeof value !== "function") {
                  break
                }
              // @ts-expect-error
              case "function":
                if (value.toString === Function.prototype.toString) {
                  break
                }
              case "string":
                result += attribute(name, quote, String(value))
                break
            }

            return result
          })
          break
        default:
          updates.push((value: Portal.Values) => {
            let result = pre
            if (value != null) {
              result += attribute(name, quote, String(value))
            }
            return result
          })
          break
      }
    }

    match = interpolation.exec(html)
  }

  const { length } = updates
  if (length !== self.values.length) {
    throw new Interpolation.InvalidTemplateException(self.templateStringsArray.toString())
  }
  if (length) {
    const last = updates[length - 1]!
    const chunk = html.slice(i)

    updates[length - 1] = (value: Portal.Values) => (last(value as never) + chunk)
  } else {
    updates.push(() => html)
  }

  return updates
}
