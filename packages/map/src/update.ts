export default function update<K, V>(
  map: Map<K, V>,
  key: K,
  fn: (value?: V) => V
) {
  return map.set(key, fn(map.get(key)))
}
