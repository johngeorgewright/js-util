export default function debounceP<Args extends unknown[], Return>(fn: (...args: Args) => Promise<Return>, ms: number): (...args: Args) => Promise<Return>;
