/**
 * Ensure types are in scope
 */
import "@effect/core"
import "@tsplus/stdlib/global"

// =============================================================================
// @tsplus/stdlib
// =============================================================================

/**
 * @tsplus global
 */
import { Ref } from "@effect/core/io/Ref"
/**
 * @tsplus global
 */
import { SynchronizedRef } from "@effect/core/io/Ref/Synchronized"
/**
 * @tsplus global
 */
import { Layer } from "@effect/core/io/Layer"
/**
 * @tsplus global
 */
import { Effect } from "@effect/core/io/Effect"
/**
 * @tsplus global
 */
import { Has } from "@tsplus/stdlib/service/Has"
/**
 * @tsplus global
 */
import { Tag } from "@tsplus/stdlib/service/Tag"
/**
 * @tsplus global
 */
import { Env } from "@tsplus/stdlib/service/Env"
/**
 * @tsplus global
 */
import { Lazy } from "@tsplus/stdlib/data/Function"
/**
 * @tsplus global
 */
import { WeakCache } from "@effect/html/io/WeakCache"
/**
 * @tsplus global
 */
import { ComponentCache } from "@effect/html/io/ComponentCache"
/**
 * @tsplus global
 */
import { TemplateCache } from "@effect/html/io/TemplateCache"
/**
 * @tsplus global
 */
import { KeyedCache } from "@effect/html/io/KeyedCache"
/**
 * @tsplus global
 */
import { Component } from "@effect/html/data/Component"
/**
 * @tsplus global
 */
import { Hole } from "@effect/html/data/Hole"
/**
 * @tsplus global
 */
import { Entry } from "@effect/html/data/Entry"
/**
 * @tsplus global
 */
import { Template } from "@effect/html/data/Template"
/**
 * @tsplus global
 */
import { Wire } from "@effect/html/data/Wire"
