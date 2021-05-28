/**
 * @deprecated Use @johngw/async-iterator
 */
export default class EventIterator<T> {
    private events;
    private next;
    private pull;
    private cancelled;
    private teardown;
    readonly cancel: () => void;
    constructor(setup: Setup<T>);
    push: (event: T) => void;
    [Symbol.asyncIterator](): {
        next: () => Promise<IteratorResult<T>>;
    };
}
declare type Setup<T> = (push: Pusher<T>) => Teardown;
declare type Pusher<T> = (event: T) => void;
declare type Teardown = () => void;
export {};
