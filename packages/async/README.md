# @johngw/async

## accumulateRace<T>(AsyncIterator<T>, number) => Promise<T[]>

Returns an array of results, that have been accumulated from an async interator, within an amount of milliseconds.

## cancelablePromise<T>(resolve, reject): Promise<T> & { cancel: () => void }

Creates a promise that can be cancelled. Cancelling a promise is the same as rejecting it with CancelPromiseError.

## mapP<T, R>(T[], (T, number) => Promise<R>): Promise<R[]>

Shortcut for:

```typescript
Promise.all(array.map(fn))
```

## timeout(number = 0): Promise<void>

Returns a promise that resolves in `ms` milliseconds.

## defer<T>(): { promise: Promise<T>, resolve: (value: T | PromiseLike<T>) => void }

Returns a promise and a `resolve` function that resolves the promise.

## debounceP<Args extends unknown[], Return>(fn: (...args: Args) => Promise<Return>, ms: number) => typeof fn

Debounces `fn` to `ms` milliseconds. The debounced function will always return the last result (`Promise<Return>`).

## detonate(number = 0, Error = TimeoutError): Promise<never>

Returns a promise that rejects in `ms` milliseconds with the given Error.

## detonateRace<T>(Promise<T>, number = 0, Error = TimeoutError): Promise<T>

Returns a promise that resolves the given promise or rejects after `ms` milliseconds.
