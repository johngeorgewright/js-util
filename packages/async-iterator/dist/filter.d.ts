export default function filter<A, B extends A>(iterable: AsyncIterable<A>, filter: (item: A) => item is B): AsyncIterable<B>;
