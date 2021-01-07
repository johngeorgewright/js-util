export default async function mapP<T, R>(
  array: T[],
  map: (item: T, index: number, array: T[]) => Promise<R>
) {
  return Promise.all(array.map(map))
}
