export default function set<K, V>(map: Map<K, V>, key: K, value: V) {
  return new Map(map).set(key, value)
}
