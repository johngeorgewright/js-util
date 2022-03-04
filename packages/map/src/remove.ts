export default function remove<K, V>(map: Map<K, V>, key: K) {
  const newMap = new Map(map)
  newMap.delete(key)
  return newMap
}
