function special() {
  //
}
special.toString = function() {
  return "alert(\"special\")"
}

describe.concurrent("renderToString", () => {
  it("should render with no placeholders or content", async () => {
    const result = await renderToString(html`<!doctype html><html />`).unsafeRunPromise()

    assert.strictEqual(result, `<!doctype html><html></html>`)
  })
  it("should render simple content", async () => {
    const result = await renderToString(html`<this>is a html test</this>`).unsafeRunPromise()

    assert.strictEqual(result, `<this>is a html test</this>`)
  })
  it("should not render empty function handler and empty attribute", async () => {
    const result = await renderToString(html`<this onclick=${
      Handler(() => {
        //
      })
    } nope=${None.none}>is a html test</this>`).unsafeRunPromise()

    assert.strictEqual(result, `<this>is a html test</this>`)
  })
  it("should not render with eventListenerObject handler with empty handleEvent and click", async () => {
    const result = await renderToString(html`<this onclick=${
      Handler({
        handleEvent() {
          //
        },
        // @ts-expect-error
        onclick() {
          //
        }
      })
    }>is a html test</this>`)
      .unsafeRunPromise()

    assert.strictEqual(result, `<this>is a html test</this>`)
  })
  it("should not render with eventListenerObject handler with empty method and attribute", async () => {
    const result = await renderToString(html`<this onclick=${
      Handler({
        handleEvent() {
          //
        },
        // @ts-expect-error
        onclick: "nope"
      })
    }>is a html test</this>`)
      .unsafeRunPromise()

    assert.strictEqual(result, `<this>is a html test</this>`)
  })
  it("should not render with eventListenerObject handler with empty handleEvent and click", async () => {
    const result = await renderToString(html`<this onclick='${
      Handler({
        handleEvent() {
          //
        },
        // @ts-expect-error
        click() {
          //
        }
      })
    }'>is a html test</this>`)
      .unsafeRunPromise()

    assert.strictEqual(result, `<this>is a html test</this>`)
  })
  it("should render with eventListenerObject handler with special function toString", async () => {
    const result = await renderToString(html`<this onclick="${
      Handler({
        handleEvent() {
          //
        },
        // @ts-expect-error
        onclick: special
      })
    }">is a html test</this>`)
      .unsafeRunPromise()

    assert.strictEqual(result, `<this onclick="alert(&quot;special&quot;)">is a html test</this>`)
  })
  it("should not render ElementRef and have an Maybe.none", async () => {
    const result = await renderToString(Do(($) => {
      const ref = $(ElementRef.empty())

      $(ref.current.map((_) => {
        assert.isTrue(_.isNone())
      }))

      return $(html`<this ref=${ref}>is a html test</this>`)
    }))
      .unsafeRunPromise()

    assert.strictEqual(result, `<this>is a html test</this>`)
  })
  it("should render Many with various elements", async () => {
    const result = await renderToString(
      // Should we support plain objects?
      html`<this>is a html ${Many("test", 123, html`test`, true, /* { toString: () => "OK" },*/ None.none)}</this>`
    )
      .unsafeRunPromise()

    assert.strictEqual(result, `<this>is a html test123testtrue</this>`)
  })
  it("should render an escaped value", async () => {
    const result = await renderToString(
      html`<this attribute=${"\""}>is a html test</this>`
    )
      .unsafeRunPromise()

    assert.strictEqual(result, `<this attribute="&quot;">is a html test</this>`)
  })
  it("should render an svg", async () => {
    const result = await renderToString(
      svg`<this>is a svg test</this>`
    )
      .unsafeRunPromise()

    assert.strictEqual(result, `<this>is a svg test</this>`)
  })
})
