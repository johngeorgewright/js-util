export default function until(fn: () => Promise<boolean>, interval?: number): Promise<void>;
