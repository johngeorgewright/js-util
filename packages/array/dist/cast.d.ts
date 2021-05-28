export default function cast<T>(x: () => void | T | T[]): T[];
export default function cast(x: undefined): [];
export default function cast<T>(x?: T | T[]): T[];
