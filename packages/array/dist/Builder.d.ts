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
    private array;
    private index;
    constructor(maxSize: number);
    add(item: T): void;
    finish(): T[];
}
