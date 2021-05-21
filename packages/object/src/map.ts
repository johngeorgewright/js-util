export default function map<A, B>(
  a: Record<string, A>,
  fn: (value: A, key: string) => B
) {
  const b: Record<string, B> = {}

  for (const key in a) {
    b[key] = fn(a[key], key)
  }

  return b
}
