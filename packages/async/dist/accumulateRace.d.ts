/**
 * @deprecated Use @johngw/async-iterator
 */
export default function accumulateRace<T>(asyncIterable: AsyncIterable<T>, ms: number): Promise<T[]>;
