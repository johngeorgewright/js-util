# @johngw/async

## timeout(ms: number = 0)

Returns a promise that resolves in `ms` milliseconds.

## detonate(ms: number = 0, error: new TimeoutError(ms))

Returns a promise that rejects in `ms` milliseconds with the given Error.

## resolver<T>()

Returns a promise and a `resolve` function that resolves the promise.
