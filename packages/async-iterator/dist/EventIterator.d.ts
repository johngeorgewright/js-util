export default class EventIterator<T> {
    private events;
    private untilArrival;
    private publishArrival;
    private cancelled;
    private teardown;
    readonly cancel: () => void;
    constructor(setup: Setup<T>);
    private setupNextArrival;
    readonly push: (event: T) => void;
    private readonly next;
    [Symbol.asyncIterator](): {
        next: () => Promise<IteratorResult<T, any>>;
    };
}
declare type Setup<T> = (push: Pusher<T>) => Teardown;
declare type Pusher<T> = (event: T) => void;
declare type Teardown = () => void;
export {};
