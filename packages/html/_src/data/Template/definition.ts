export const TemplateSym = Symbol.for("@effect/html/data/Template")
export type TemplateSym = typeof TemplateSym

export declare namespace Template {
  export interface Node {
    type: "node" | "text" | "attr"
    path: Chunk<number>
    name: Maybe<string>
  }
}

/**
 * @tsplus type ets/Template
 */
export interface Template {
  readonly [TemplateSym]: TemplateSym
}

/**
 * @tsplus type ets/Template/Ops
 */
export interface TemplateOps {
  $: TemplateAspects
}
export const Template: TemplateOps = {
  $: {}
}

/**
 * @tsplus type ets/Template/Aspects
 */
export interface TemplateAspects {}
