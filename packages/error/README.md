# @johngw/error

Error handling

## `assertNever<T, M extends string>(message: M, type: T): CompileError<[M, T]>`

An adaptation of [assertNever](https://github.com/aikoven/assert-never#readme) that provides the reader with a custom type error.
