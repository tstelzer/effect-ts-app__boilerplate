import { Where } from "@effect-ts-app/boilerplate-infra/services/Store"
import type { FieldValues } from "./filter/types/fields.js"
import type { FieldPath, FieldPathValue } from "./filter/types/path/eager.js"

/**
 * the function defaults to "eq", but has additional properties for notEq, in and notIn
 */
export interface WhereFilter<TFieldValues extends FieldValues> extends ReturnType<typeof makeWhereFilter_<TFieldValues>> {}
export function makeWhereFilter<TFieldValues extends FieldValues>() {
  const f = makeWhereFilter_<TFieldValues>()
  return f as WhereFilter<TFieldValues>
}

function makeHelpers<TFieldValues extends FieldValues>() {
  const helpers = makeHelpers_<TFieldValues>()
  return helpers as WhereHelpers<TFieldValues>
}

export interface WhereHelpers<TFieldValues extends FieldValues> extends ReturnType<typeof makeHelpers_<TFieldValues>> {}

function makeHelpers_<TFieldValues extends FieldValues>() {
  type Paths = FieldPath<TFieldValues>
  type Value<TFieldName extends Paths> = FieldPathValue<TFieldValues, TFieldName>

  return {
    in<TFieldName extends Paths, V extends Value<TFieldName>>(
      this: void,
      path: TFieldName,
      value: readonly V[]
    ) {
      return { key: path, value, t: "in" as const }
    },
    notIn<TFieldName extends Paths, V extends Value<TFieldName>>(
      this: void,
      path: TFieldName,
      value: readonly V[]
    ) {
      return { key: path, value, t: "not-in" as const }
    },
    eq<TFieldName extends Paths, V extends Value<TFieldName>>(
      this: void,
      path: TFieldName,
      value: V
    ) {
      return { key: path, value, t: "eq" as const }
    },
    notEq<TFieldName extends Paths, V extends Value<TFieldName>>(
      this: void,
      path: TFieldName,
      value: V
    ) {
      return { key: path, value, t: "not-eq" as const }
    }
  } satisfies Record<string, (...args: any[]) => Where>
}

function makeWhereFilter_<TFieldValues extends FieldValues>() {
  const helpers = makeHelpers<TFieldValues>()
  const f = Object.assign(helpers.eq, helpers)
  return f
}



export type WhereValue<
  T extends "eq" | "not-eq" | "starts-with" | "ends-with" | "includes" | "contains" | "not-contains",
  A extends SupportedValues,
  V extends A = A
> = { t: T; v: V }
type SupportedValues = string | boolean | number | null

export type WhereIn<T extends "in" | "not-in", V, Values extends readonly V[] = readonly V[]> = {
  t: T
  v: Values
}

/**
 * @tsplus fluent Collection $contains
 */
export function $$contains<A extends SupportedValues, V extends A>(
  _: readonly A[],
  v: V
): WhereValue<"contains", A, V> {
  return $contains(v)
}

/**
 * @tsplus fluent Collection $notContains
 */
export function $$notContains<A extends SupportedValues, V extends A>(
  _: readonly A[],
  v: V
): WhereValue<"not-contains", A, V> {
  return $notContains(v)
}

/**
 * @tsplus fluent string $in
 * @tsplus fluent boolean $in
 * @tsplus fluent number $in
 */
export function $$in<A extends SupportedValues, Values extends readonly A[]>(
  _: A,
  ...v: Values
): WhereIn<"in", A, Values> {
  return $in(v)
}

/**
 * @tsplus fluent string $notIn
 * @tsplus fluent boolean $notIn
 * @tsplus fluent number $notIn
 */
export function $$notIn<A extends SupportedValues, Values extends readonly A[]>(
  _: A,
  ...v: Values
): WhereIn<"not-in", A, Values> {
  return $notIn(v)
}

/**
 * @tsplus fluent string $is
 * @tsplus fluent boolean $is
 * @tsplus fluent number $is
 */
export function $$is<A extends SupportedValues, V extends A>(_: A, v: V): WhereValue<"eq", A, V> {
  return $is(v)
}
/**
 * @tsplus fluent string $isnt
 * @tsplus fluent boolean $isnt
 * @tsplus fluent number $isnt
 */
export function $$isnt<A extends SupportedValues, V extends A>(_: A, v: V): WhereValue<"not-eq", A, V> {
  return $isnt(v)
}

/**
 * @tsplus fluent string $startsWith
 */
export function $$startsWith<A extends string, V extends A>(_: A, v: V): WhereValue<"starts-with", A, V> {
  return $startsWith(v)
}

/**
 * @tsplus fluent string $endsWith
 */
export function $$endsWith<A extends string, V extends A>(_: A, v: V): WhereValue<"ends-with", A, V> {
  return $endsWith(v)
}

/**
 * @tsplus fluent string $includes
 */
export function $$includes<A extends string, V extends A>(_: A, v: V): WhereValue<"includes", A, V> {
  return $includes(v)
}

function $in<L extends readonly any[]>(v: L) {
  return { t: "in" as const, v }
}

function $notIn<L extends readonly any[]>(v: L) {
  return { t: "not-in" as const, v }
}
function $is<A>(v: A) {
  return { t: "eq" as const, v }
}
function $isnt<A>(v: A) {
  return { t: "not-eq" as const, v }
}

// containsAny, containsAll?
function $contains<A>(v: A) {
  return { t: "contains" as const, v }
}
function $notContains<A>(v: A) {
  return { t: "not-contains" as const, v }
}
function $includes<A extends string>(v: A) {
  return { t: "includes" as const, v }
}
function $startsWith<A extends string>(v: A) {
  return { t: "starts-with" as const, v }
}
function $endsWith<A extends string>(v: A) {
  return { t: "ends-with" as const, v }
}



// export function makeFilter<TFieldValues extends FieldValues>() {
//   const f = makeFilter_<TFieldValues>()
//   return f as WhereFilterHelper<TFieldValues>
// }

// export interface WhereFilterHelper<TFieldValues extends FieldValues> extends ReturnType<typeof makeFilter_<TFieldValues>> {}

// function makeFilter_<TFieldValues extends FieldValues>() {
//   function eq<TFieldName extends FieldPath<TFieldValues>, V extends FieldPathValue<TFieldValues, TFieldName>>(
//     path: TFieldName,
//     value: V
//   ) {
//     return { key: path, value, t: "eq" as const }
//   }
//   const f = Object.assign(eq satisfies (...args: any[]) => Where, {
//     in<TFieldName extends FieldPath<TFieldValues>, V extends FieldPathValue<TFieldValues, TFieldName>>(
//       path: TFieldName,
//       value: readonly V[]
//     ) {
//       return { key: path, value, t: "in" as const }
//     },
//     notIn<TFieldName extends FieldPath<TFieldValues>, V extends FieldPathValue<TFieldValues, TFieldName>>(
//       path: TFieldName,
//       value: readonly V[]
//     ) {
//       return { key: path, value, t: "not-in" as const }
//     },
//     eq,
//     notEq<TFieldName extends FieldPath<TFieldValues>, V extends FieldPathValue<TFieldValues, TFieldName>>(
//       path: TFieldName,
//       value: V
//     ) {
//       return { key: path, value, t: "not-eq" as const }
//     }
//   } satisfies Record<string, (...args: any[]) => Where>)
//   return f
// }
