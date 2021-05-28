export default function combineIterators<T>(...asyncIterables: AsyncIterable<T>[]): AsyncGenerator<any, any[], unknown>;
