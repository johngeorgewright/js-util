export default function mapP<T, R>(array: T[], map: (item: T, index: number, array: T[]) => Promise<R>): Promise<R[]>;
