/**
 * @deprecated Use @johngw/async-iterator
 */
export default function combineIterators<T>(...asyncIterables: AsyncIterable<T>[]): AsyncGenerator<any, any[], unknown>;
