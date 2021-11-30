export default function map<
  I extends Record<string | number | symbol, unknown>,
  O extends { [K in keyof I]: unknown }
>(i: I, fn: <K extends keyof I>(value: I[K], key: K) => O[K]) {
  return Object.entries(i).reduce(
    (o, [k, v]) => ({ ...o, [k]: fn(v as I[keyof I], k) }),
    {} as O
  )
}
