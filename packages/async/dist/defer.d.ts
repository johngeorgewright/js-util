export default function defer<T = void>(): {
    promise: Promise<T>;
    reject(reason?: any): void;
    resolve(value: T | PromiseLike<T>): void;
};
