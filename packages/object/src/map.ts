export default function map<
  I extends Record<string | number | symbol, unknown>,
  R
>(i: I, fn: <K extends keyof I>(value: I[K], key: K) => R) {
  return Object.entries(i).reduce(
    (o, [k, v]) => ({ ...o, [k]: fn(v as I[keyof I], k) }),
    {} as { [K in keyof I]: R }
  )
}
