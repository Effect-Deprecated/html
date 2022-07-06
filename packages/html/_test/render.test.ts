import { DOMParser } from "linkedom"

const fragment = () => html`<p>1</p><p>2</p>`
const variousContent = <R>(content: Placeholder<R>) => html`${content}`

const document = (new DOMParser()).parseFromString("<html />", "text/html")
const div = document.createElement("div") as unknown as Element
const sameWire = <R>(content: Placeholder<R>) => html`<div>${content}</div>`

// patch global this with mocked dom entities
// @ts-expect-error
globalThis.document = document
globalThis.CharacterData = document.defaultView.CharacterData
globalThis.Node = document.defaultView.Node
globalThis.Element = document.defaultView.Element
globalThis.HTMLElement = document.defaultView.HTMLElement
globalThis.DocumentFragment = document.defaultView.DocumentFragment

describe("render", () => {
  it("node is instanceof HTMLElement", async () => {
    const program = Do(($) => {
      const elementA = $(html.node`<div>foo</div>`)
      const elementB = $(html.node`
    <div>bar</div>
  `)

      assert.isTrue(elementA instanceof HTMLElement, "elementA not instanceof HTMLElement")
      assert.isTrue(elementB instanceof HTMLElement, "elementB not instanceof HTMLElement")
    }).provideSomeLayer(RenderContext("DOM"))

    await program.unsafeRunPromise()
  })
  it("should render a simple template", async () => {
    const program = Do(($) => {
      const result = $(render(document.body, html`this is a test`))

      assert.equal(result.textContent, "this is a test")
    })

    await program.unsafeRunPromise()
  })
  it("should render a template with collection", async () => {
    const program = Do(($) => {
      const result = $(render(document.body, html`this is a ${Many.from([1, 2].map(n => html`${n}`))} test`))

      assert.equal(result.textContent, "this is a 12 test")
    })

    await program.unsafeRunPromise()
  })
  it("should render a template with collection of svg", async () => {
    const program = Do(($) => {
      const result = $(render(document.body, html`this is a ${Many.from([1, 2].map(n => svg`${n}`))} test`))

      assert.equal(result.textContent, "this is a 12 test")
    })

    await program.unsafeRunPromise()
  })
  it("should render twice with different state", async () => {
    const program = Do(($) => {
      $(
        Effect.collectAll(Chunk.fill(2, (i) =>
          render(
            document.body,
            html`this is a ${Many.from((i ? [1, 2, 3] : [1, 2]).map(n => svg`${n}`))} test`
          ).map((body) => assert.equal(body.textContent, i ? "this is a 123 test" : "this is a 12 test"))))
      )
    })

    await program.unsafeRunPromise()
  })
  it("should render an interpolated string", async () => {
    const program = Do(($) => {
      const result = $(render(document.body, html`${"test"}`))

      assert.equal(result.textContent, "test")
    })

    await program.unsafeRunPromise()
  })
  it("should render an interpolated boolean", async () => {
    const program = Do(($) => {
      const result = $(render(document.body, html`${true}`))

      assert.equal(result.textContent, "true")
    })

    await program.unsafeRunPromise()
  })
  it("should render various interpolated numbers", async () => {
    const program = Do(($) => {
      const result = $(render(document.body, html`${1} ${2} ${3}`))

      assert.equal(result.textContent, "1 2 3")
    })

    await program.unsafeRunPromise()
  })
  it("should render an interpolated number", async () => {
    const program = Do(($) => {
      const result = $(render(document.body, html`${1}`))

      assert.equal(result.textContent, "1")
    })

    await program.unsafeRunPromise()
  })
  it("should render a HTMLElement inside a div", async () => {
    const program = Do(($) => {
      const result = $(render(div, html.node`this is a test`))

      assert.equal(result.textContent, "this is a test")
    })

    await program.unsafeRunPromise()
  })
  it("should do a simple keyed render", async () => {
    const program = Do(($) => {
      const result = $(render(div, html.for(document.body)`this is a test`))

      assert.equal(result.textContent, "this is a test")
    })

    await program.unsafeRunPromise()
  })
  it("should do a keyed render with id", async () => {
    const program = Do(($) => {
      const result = $(render(div, html.for(document.body, 1)`this is a test`))

      assert.equal(result.textContent, "this is a test")
    })

    await program.unsafeRunPromise()
  })
  it("should do a keyed render twice with different id", async () => {
    const program = Do(($) => {
      $(
        Effect.collectAll(Chunk.fill(2, (i) =>
          render(
            div,
            html.for(document.body, i ? undefined : 1)`this is a test`
          ).map((_) => {
            assert.equal(_.textContent, "this is a test")
            return _.firstChild
          }))).map((_) => assert.equal(_.uniq(Equivalence.strict<ChildNode | null>()).length, 2))
      )
    })

    await program.unsafeRunPromise()
  })
  it("should do a keyed render once with same id", async () => {
    const program = Do(($) => {
      $(
        Effect.collectAll(Chunk.fill(2, (i) =>
          render(
            div,
            html.for(document.body, 1)`this is a test`
          ).map((_) => {
            assert.equal(_.textContent, "this is a test")
            return _.firstChild
          }))).map((_) => assert.equal(_.uniq(Equivalence.strict<ChildNode | null>()).length, 1))
      )
    })

    await program.unsafeRunPromise()
  })
  it("should render onclick handler", async () => {
    const program = Do(($) => {
      let clicked = false
      $(
        render(
          div,
          html`<div test="${123}" onclick=${
            Handler(() => {
              clicked = true
            })
          } null=${None.none} />`
        )
      )

      div.firstElementChild!.dispatchEvent(new document.defaultView!.Event("click"))

      assert.isTrue(clicked)
    })

    await program.unsafeRunPromise()
  })
  it("should render textarea template with interpolated string", async () => {
    const program = Do(($) => {
      const result = $(
        render(document.createElement("div") as unknown as Element, html`<textarea>${"test"}</textarea>`)
      )

      assert.equal(result.innerHTML, "<textarea>test</textarea>")
    })

    await program.unsafeRunPromise()
  })
  it("should render style template with interpolated string", async () => {
    const program = Do(($) => {
      const result = $(render(document.createElement("div") as unknown as Element, html`<style>${"test"}</style>`))

      assert.equal(result.innerHTML, "<style>test</style>")
    })

    await program.unsafeRunPromise()
  })
  it("should render same wire with various different/same content", async () => {
    const program = Do(($) => {
      $(render(div, sameWire(Many(fragment()))))
      assert.equal(div.innerHTML, `<div><p>1</p><p>2</p><!--${Interpolation.PREFIX}0--></div>`)
      $(render(div, sameWire(Many.empty())))
      assert.equal(div.innerHTML, `<div><!--${Interpolation.PREFIX}0--></div>`)
      $(render(div, sameWire(Many(fragment()))))
      assert.equal(div.innerHTML, `<div><p>1</p><p>2</p><!--${Interpolation.PREFIX}0--></div>`)
      $(render(div, sameWire("test")))
      assert.equal(div.innerHTML, `<div>test<!--${Interpolation.PREFIX}0--></div>`)
      const previousChild = div.firstChild
      $(render(div, sameWire("test")))
      assert.equal(div.innerHTML, `<div>test<!--${Interpolation.PREFIX}0--></div>`)
      assert.equal(previousChild, div.firstChild)
      $(render(div, sameWire(document.createElement("p") as unknown as Element)))
      assert.equal(div.innerHTML, `<div><p></p><!--${Interpolation.PREFIX}0--></div>`)
      $(render(
        div,
        sameWire(
          document.createDocumentFragment().appendChild(document.createElement("p")) as unknown as DocumentFragment
        )
      ))
      assert.equal(div.innerHTML, `<div><p></p><!--${Interpolation.PREFIX}0--></div>`)
    })

    await program.unsafeRunPromise()
  })
  it("should render various interpolated content", async () => {
    const comment = `<!--${Interpolation.PREFIX}0-->`
    const program = Do(($) => {
      $(render(
        div,
        variousContent(Many(
          html`<p />`,
          html`<p />`
        ))
      ))
      assert.equal(div.innerHTML, `<p></p><p></p>${comment}`)
      $(render(
        div,
        variousContent(Many(
          html`<p />`,
          html`<p />`,
          html`<p />`
        ))
      ))
      assert.equal(div.innerHTML, `<p></p><p></p><p></p>${comment}`)
      $(render(
        div,
        variousContent(Many(
          html`<p />`
        ))
      ))
      assert.equal(div.innerHTML, `<p></p>${comment}`)
      $(render(
        div,
        variousContent("text")
      ))
      assert.equal(div.innerHTML, `text${comment}`)
      $(render(
        div,
        variousContent(None.none)
      ))
      assert.equal(div.innerHTML, `${comment}`)
      $(render(
        div,
        variousContent(Many(true))
      ))
      assert.equal(div.innerHTML, `true${comment}`)
      $(render(
        div,
        variousContent(Many(1))
      ))
      assert.equal(div.innerHTML, `1${comment}`)
      $(render(
        div,
        variousContent(Many("none"))
      ))
      assert.equal(div.innerHTML, `none${comment}`)
    })

    await program.unsafeRunPromise()
  })
  it("should render a elementref", async () => {
    const program = Do(($) => {
      const template = <R>(ref: Placeholder<R>) => html`<div ref=${ref}>test</div>`
      const ref = $(ElementRef.empty())

      $(render(
        div,
        template(ref).zipLeft(afterRender(ref.current.map((_) => assert.isTrue(_.isSome()))))
      ))
      assert.equal(div.innerHTML, `<div>test</div>`)

      const ref2 = $(ElementRef.empty())
      $(render(
        div,
        template(ref2).zipLeft(
          afterRender(ref.current.map((_) => assert.isTrue(_.isNone())))
        ).zipLeft(afterRender(ref2.current.map((_) => assert.isTrue(_.isSome()))))
      ))
      assert.equal(div.innerHTML, `<div>test</div>`)
    })

    await program.unsafeRunPromise()
  })
  it("should render various handlers interpolations", async () => {
    const withHandler = (handler: Effect.UIO<Handler>) => html`<div onClick=${handler} />`
    let objectClicked = false
    let fnClicked = false
    const program = Do(($) => {
      $(render(
        div,
        withHandler(Handler({
          handleEvent: () => {
            objectClicked = true
          }
        }))
      ))
      assert.equal(div.innerHTML, `<div></div>`)
      div.firstElementChild!.dispatchEvent(new document.defaultView!.Event("click"))
      assert.isTrue(objectClicked)

      $(render(
        div,
        withHandler(Handler(() => fnClicked = true))
      ))
      assert.equal(div.innerHTML, `<div></div>`)
      div.firstElementChild!.dispatchEvent(new document.defaultView!.Event("click"))
      assert.isTrue(fnClicked)
    })

    await program.unsafeRunPromise()
  })
  it("should render various attribute interpolations", async () => {
    const withAttribute = <R>(placeholder: Placeholder<R>) => html`<div test=${placeholder} />`
    const program = Do(($) => {
      $(render(
        div,
        withAttribute(None.none)
      ))
      assert.equal(div.innerHTML, `<div></div>`)
      $(render(
        div,
        withAttribute("test")
      ))
      const previousChild = div.firstChild
      assert.equal(div.innerHTML, `<div test="test"></div>`)
      $(render(
        div,
        withAttribute(Effect.succeed("test"))
      ))
      assert.equal(div.innerHTML, `<div test="test"></div>`)
      assert.equal(previousChild, div.firstChild)
      $(render(
        div,
        withAttribute(None.none)
      ))
      assert.equal(div.innerHTML, `<div></div>`)
      $(render(
        div,
        withAttribute("test")
      ))
      assert.equal(div.innerHTML, `<div test="test"></div>`)
    })

    await program.unsafeRunPromise()
  })
  it("should render various text interpolations", async () => {
    const withText = <R>(placeholder: Placeholder<R>) => html`<textarea>${placeholder}</textarea>`
    const program = Do(($) => {
      $(render(
        div,
        withText("test")
      ))
      assert.equal(div.innerHTML, `<textarea>test</textarea>`)
      let previousChild = div.firstChild?.firstChild
      $(render(
        div,
        withText("test")
      ))
      assert.equal(div.innerHTML, `<textarea>test</textarea>`)
      assert.equal(previousChild, div.firstChild?.firstChild)
      previousChild = div.firstChild?.firstChild
      $(render(
        div,
        withText(None.none)
      ))
      assert.equal(div.innerHTML, `<textarea></textarea>`)
      assert.notEqual(previousChild, div.firstChild?.firstChild)
      $(render(
        div,
        withText("test")
      ))
      assert.equal(div.innerHTML, `<textarea>test</textarea>`)

      $(render(
        div,
        Effect.succeed(document.createDocumentFragment() as unknown as DocumentFragment)
      ))
    })

    await program.unsafeRunPromise()
  })
  it("should render empty document fragment", async () => {
    const program = Do(($) => {
      $(render(
        div,
        Effect.succeed(document.createDocumentFragment() as unknown as DocumentFragment)
      ))

      assert.equal(div.textContent, "")
    })

    await program.unsafeRunPromise()
  })
  it("should render various many with wires", async () => {
    const program = Do(($) => {
      const wire1 = html`<p /><p />`
      const wire2 = html`<div /><div />`
      const wire = <R>(what: Placeholder<R>) => html`${what}`

      $(render(div, wire(Many(wire1, fragment(), wire2))))
      assert.equal(div.innerHTML, "<p></p><p></p><p>1</p><p>2</p><div></div><div></div><!--isµ0-->")
      $(render(div, wire(Many(wire2, fragment(), wire1))))
      assert.equal(div.innerHTML, "<div></div><div></div><p>1</p><p>2</p><p></p><p></p><!--isµ0-->")
    })

    await program.unsafeRunPromise()
  })
  it("should render two wires", async () => {
    const program = Do(($) => {
      $(render(div, html`<two /><holes />`))
      assert.equal(div.innerHTML, "<two></two><holes></holes>")
    })

    await program.unsafeRunPromise()
  })
  it("should render one wire", async () => {
    const program = Do(($) => {
      $(render(div, html``))
      assert.equal(div.innerHTML, "")
    })

    await program.unsafeRunPromise()
  })
  it("should error on broken template", async () => {
    const program = Do(($) => {
      $(render(div, html`<p test="is ${"really"} broken" ${"isn't it"}></p>`))
      assert.equal(div.innerHTML, "<one></one>")
    })

    const exit = await program.unsafeRunPromiseExit()

    assert.instanceOf(
      exit.isFailure() ? exit.cause.dieMaybe.getOrElse("") : "",
      Interpolation.InvalidTemplateException
    )
  })
  it("render same attribute with different interpolations", async () => {
    const sameAttribute = <R>(value: Placeholder<R>) => html`<div test=${value} />`
    const program = Do(($) => {
      $(render(document.body, sameAttribute(1)))
      assert.equal(document.body.innerHTML, "<div test=\"1\"></div>")
      $(render(document.body, sameAttribute(None.none)))
      assert.equal(document.body.innerHTML, "<div></div>")
      $(render(document.body, sameAttribute(None.none)))
      assert.equal(document.body.innerHTML, "<div></div>")
      $(render(document.body, sameAttribute(2)))
      assert.equal(document.body.innerHTML, "<div test=\"2\"></div>")
      $(render(document.body, sameAttribute(3)))
      assert.equal(document.body.innerHTML, "<div test=\"3\"></div>")
    })

    await program.unsafeRunPromise()
  })
  it("render various assortment of interpolations", async () => {
    const program = Do(($) => {
      $(render(document.body, html`<p><!--nope--></p><p>${"hole"}</p>`))
      assert.equal(document.body.innerHTML, "<p><!--nope--></p><p>hole<!--isµ0--></p>")
      $(render(document.body, html`<h1>test</h1>`))
      assert.equal(document.body.innerHTML, "<h1>test</h1>")
      $(render(document.body, html`<h2>test</h2><h3>test</h3>`))
      assert.equal(document.body.innerHTML, "<h2>test</h2><h3>test</h3>")
      $(render(document.body, html`${fragment()}`))
      assert.equal(document.body.innerHTML, "<p>1</p><p>2</p><!--isµ0-->")
      $(render(document.body, html`${fragment()}`))
      assert.equal(document.body.innerHTML, "<p>1</p><p>2</p><!--isµ0-->")
      $(render(document.body, html`${Many(fragment())}`))
      assert.equal(document.body.innerHTML, "<p>1</p><p>2</p><!--isµ0-->")
      $(render(document.body, html`<h1 data-test="${123}">${"content"}</h1>`))
      assert.equal(document.body.innerHTML, "<h1 data-test=\"123\">content<!--isµ1--></h1>")
      $(render(
        document.body,
        html`<div test="${123}" onclick=${
          Handler(() => {
            //
          })
        } null=${None.none} />`
      ))
      assert.equal(document.body.innerHTML, "<div test=\"123\"></div>")
      $(render(
        document.body,
        variousContent(Many(
          html`<p />`,
          html`<p />`
        ))
      ))
      assert.equal(document.body.innerHTML, "<p></p><p></p><!--isµ0-->")
      $(render(
        document.body,
        variousContent(Many(
          html`<p />`,
          html`<p />`,
          html`<p />`
        ))
      ))
      assert.equal(document.body.innerHTML, "<p></p><p></p><p></p><!--isµ0-->")
      $(render(
        document.body,
        variousContent(Many(
          html`<p />`
        ))
      ))
      assert.equal(document.body.innerHTML, "<p></p><!--isµ0-->")
      $(render(
        document.body,
        html`<last test=${123}>${456}</last>`
      ))
      assert.equal(document.body.innerHTML, "<last test=\"123\">456<!--isµ1--></last>")
    })

    await program.unsafeRunPromise()
  })
})
