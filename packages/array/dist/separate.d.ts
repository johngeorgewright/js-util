export default function separate<T, R extends T, L extends Exclude<T, R>>(input: ArrayLike<T>, predicate: (item: T) => item is R): [L[], R[]];
