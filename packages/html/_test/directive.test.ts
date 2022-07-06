import { DOMParser } from "linkedom"

const document = (new DOMParser()).parseFromString("<html />", "text/html")

// patch global this with mocked dom entities
// @ts-expect-error
globalThis.document = document
globalThis.CharacterData = document.defaultView.CharacterData
globalThis.Node = document.defaultView.Node
globalThis.Element = document.defaultView.Element
globalThis.HTMLElement = document.defaultView.HTMLElement
globalThis.DocumentFragment = document.defaultView.DocumentFragment

describe("render", () => {
  it("should render a simple template", async () => {
    const program = Do(($) => {
      const directive = Handler(() => {
        //
      })
      const result = $(render(
        document.body,
        html`<div ${directive} attr=${"test"}></div>`
      ))

      assert.equal(result.innerHTML, "<div attr=\"test\"></div>")
    })

    console.log(await program.unsafeRunPromiseExit())
  })
})
