export default function map<A, B>(a: Record<string, A>, fn: (value: A, key: string) => B): Record<string, B>;
