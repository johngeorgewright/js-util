export default class CancelPromiseError<T = void> extends Error {
    readonly promise: Promise<T>;
    constructor(promise: Promise<T>);
}
