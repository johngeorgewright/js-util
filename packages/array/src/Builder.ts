/**
 * 3x faster than just pushing items to an array.
 * However, you must specify a maximum size.
 *
 * @example
 * const builder = new Builder<number>(3)
 * builder.add(1)
 * builder.add(2)
 * builder.finish() // [1, 2]
 */
export default class Builder<T> {
  private array: T[]
  private index: number

  constructor(maxSize: number) {
    this.array = new Array(maxSize)
    this.index = 0
  }

  add(item: T) {
    this.array[this.index++] = item
  }

  finish() {
    this.array.length = this.index
    return this.array
  }
}
