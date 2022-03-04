export default function map<K, V1, V2>(
  map: Map<K, V1>,
  fn: (key: K, value: V1) => V2
) {
  const newMap = new Map<K, V2>()
  for (const [key, value] of map) newMap.set(key, fn(key, value))
  return newMap
}
