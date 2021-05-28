export interface CancelablePromise<T> extends Promise<T> {
    cancel(): void;
}
export default function cancelablePromise<T = void>(executor: (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void): CancelablePromise<T>;
