export default function filter<K, V>(
  map: Map<K, V>,
  fn: (key: K, value: V) => boolean
) {
  const newMap = new Map<K, V>()
  for (const [key, value] of map) if (fn(key, value)) newMap.set(key, value)
  return newMap
}
