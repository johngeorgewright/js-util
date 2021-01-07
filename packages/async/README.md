# @johngw/async

## mapP<T, R>(T[], (T, number) => Promise<R>): Promise<R[]>

Shortcut for:

```typescript
Promise.all(array.map(fn))
```

## timeout(number = 0): Promise<void>

Returns a promise that resolves in `ms` milliseconds.

## detonate(number = 0, Error = TimeoutError): Promise<never>

Returns a promise that rejects in `ms` milliseconds with the given Error.

## detonateRace<T>(Promise<T>, number = 0, Error = TimeoutError): Promise<T>

Returns a promise that resolves the given promise or rejects after `ms` milliseconds.

## resolver<T>(): { promise: Promise<T>, resolve: (value: T | PromiseLike<T>) => void }

Returns a promise and a `resolve` function that resolves the promise.
