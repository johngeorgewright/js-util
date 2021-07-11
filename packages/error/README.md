# @johngw/error

Error handling

## `assertNever<T, M extends string>(message: M, type: T): CompileError<[M, T]>`

An adaptation of [assertNever](https://github.com/aikoven/assert-never#readme) that provides the reader with a custom type error.

## `tryCatch`

Try/catch as an expression that handles error types.

### Simple example

```typescript
const result = tryCatch(
  () => {
    throw new Error('foobar')
  },
  (error) => {
    error.message
  }
)
expect(result).toBe('foobar')
```

### Passing arguments example

```typescript
const result = tryCatch(
  (a, b) => {
    throw new Error(`${a}${b}`)
  },
  (error) => {
    error.message
  },
  'foo',
  'bar'
)
expect(result).toBe('foobar')
```

### Type catching

```typescript
import { except, tryCatch } from '@johngw/error'

const result = tryCatch(() => {
  throw new ReferenceError('Bad reference')
}, [
  except(ReferenceError, (error) => 'On no, bad reference'),
  (error) => {
    error.message
  },
])
expect(result).toBe('On no, bad reference')
```

### Promises example

This will resolve/catch promise errors too.

```typescript
const result = await tryCatch(
  async () => {
    throw new Error('foobar')
  },
  async (error) => {
    error.message
  }
)
expect(result).toBe('foobar')
expect(result).toBe('On no, bad reference')
```
