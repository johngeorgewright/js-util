export default function cast<T>(x: T[]): T[]
export default function cast<T>(x: () => T | T[]): T[]
export default function cast(x: undefined): []
export default function cast<T>(x: T): T[]
export default function cast(x: unknown) {
  return Array.isArray(x)
    ? x
    : isFunction(x)
    ? cast(x())
    : x === undefined
    ? []
    : [x]
}

function isFunction(x: any): x is () => unknown {
  return typeof x === 'function'
}
