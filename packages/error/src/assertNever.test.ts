import { test } from 'vitest'
import assertNever from './assertNever.js'

test('doesnt error when the given value is `never`', () => {
  enum T {
    A,
    B,
  }

  ;(t: T): T => {
    switch (t) {
      case T.A:
        return t
      case T.B:
        return t
      default:
        return assertNever('I will be ignore', t)
    }
  }
})

test('errors when the given value isnt `never`', () => {
  enum T {
    A,
    B,
    C,
  }

  ;(t: T): T => {
    switch (t) {
      case T.A:
        return t
      case T.B:
        return t
      default:
        // @ts-expect-error
        return assertNever('I should error', t)
    }
  }
})
