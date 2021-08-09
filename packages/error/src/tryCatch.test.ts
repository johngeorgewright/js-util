import { except, tryCatch, tryFinally } from './tryCatch'

test('try/catch as return statement', () => {
  expect(
    tryCatch(
      () => 'a',
      () => 'b'
    )
  ).toBe('a')

  expect(
    tryCatch(
      () => {
        throw new Error('a')
      },
      () => 'b'
    )
  ).toBe('b')

  expect(() =>
    tryCatch(
      () => {
        throw new Error('a')
      },
      () => {
        throw new Error('b')
      }
    )
  ).toThrow('b')
})

test('with args', () => {
  expect(
    tryCatch(
      (a, b) => a + b,
      (_, a, b) => a * b,
      1,
      2
    )
  ).toBe(3)

  expect(
    tryCatch(
      (_a, _b) => {
        throw new Error()
      },
      (_, a, b) => a * b,
      1,
      2
    )
  ).toBe(2)
})

test('catch types', () => {
  tryCatch(() => {
    throw new FooError()
  }, [
    except(BarError, () => {
      throw new Error('Caught wrong error type')
    }),
    except(FooError, (error) => {
      expect(error).toHaveProperty('foo', true)
    }),
    () => {
      throw new Error('No error type was successfully caught.')
    },
  ])
})

test('fallback when no type is matched', () => {
  class FarError extends Error {
    far = true
  }

  tryCatch(() => {
    throw new FarError()
  }, [
    except(BarError, () => {
      throw new Error('Caught wrong error type')
    }),
    except(FooError, () => {
      throw new Error('Caught wrong error type')
    }),
    (error) => {
      expect(error).toHaveProperty('far', true)
    },
  ])
})

test('promises', async () => {
  await expect(
    tryCatch(
      async () => {
        throw new Error('foobar')
      },
      async (error) => error.message
    )
  ).resolves.toBe('foobar')
})

test('promises with type matching', async () => {
  await expect(
    tryCatch(async () => {
      throw new FooError('foobar')
    }, [
      except(BarError, async () => {
        throw new Error('Caught wrong error type')
      }),
      except(FooError, async (error) => error),
      async () => {
        throw new Error('No error type was successfully caught.')
      },
    ])
  ).resolves.toHaveProperty('foo', true)
})

test('tryFinally', async () => {
  const bar = jest.fn(() => 'bar')
  const barP = jest.fn(async () => void 0)

  expect(tryFinally(() => 'foo', bar)).toBe('foo')
  expect(bar).toHaveBeenCalled()

  await expect(tryFinally(async () => 'foo', barP)).resolves.toBe('foo')
  expect(barP).toHaveBeenCalled()
})

class FooError extends Error {
  foo = true
}

class BarError extends Error {
  bar = true
}
