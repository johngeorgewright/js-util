export default function get<K, V>(map: Map<K, V>, key: K): V | undefined

export default function get<K, V>(map: Map<K, V>, key: K, dflt: V): V

export default function get<K, V>(
  map: Map<K, V>,
  key: K,
  dflt?: V
): V | undefined {
  return map.has(key) ? map.get(key) : dflt
}
