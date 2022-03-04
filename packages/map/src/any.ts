export default function any<K, V>(
  map: Map<K, V>,
  fn: (key: K, value: V) => boolean
) {
  for (const [key, value] of map) if (fn(key, value)) return true
  return false
}
