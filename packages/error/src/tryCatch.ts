export function tryCatch<T, Args extends unknown[]>(
  t: (...args: Args) => T,
  c: CatchHandler<T, Args>,
  ...args: Args
): T | undefined {
  try {
    const result = t(...args)
    return (
      result instanceof Promise
        ? result.catch((e) => catchHandler(e, c, args))
        : result
    ) as T
  } catch (error) {
    return catchHandler(error, c, args)
  }
}

export function tryFinally<T, Args extends unknown[]>(
  t: (...args: Args) => T,
  f: (...args: Args) => T,
  ...args: Args
): T | undefined {
  let isPromise = false
  try {
    const result = t(...args)
    isPromise = result instanceof Promise
    return (
      isPromise
        ? (result as unknown as Promise<T>).finally(() => f(...args))
        : result
    ) as T
  } finally {
    if (!isPromise) {
      f(...args)
    }
  }
}

export function tryCatchFinally<T, Args extends unknown[]>(
  t: (...args: Args) => T,
  c: CatchHandler<T, Args>,
  f: (...args: Args) => T,
  ...args: Args
): T | undefined {
  let isPromise = false
  try {
    const result = t(...args)
    isPromise = result instanceof Promise
    return (
      isPromise
        ? (result as unknown as Promise<T>)
            .catch((e) => catchHandler(e, c, args))
            .finally(() => f(...args))
        : result
    ) as T
  } catch (error) {
    return catchHandler(error, c, args)
  } finally {
    if (!isPromise) {
      f(...args)
    }
  }
}

function catchHandler<T, Args extends unknown[]>(
  error: any,
  c: CatchHandler<T, Args>,
  args: Args
) {
  const excepts = Array.isArray(c) ? c : [c]

  for (const except of excepts) {
    const result = except(error, ...args)

    if (!(result instanceof ExceptResult)) {
      return result
    } else if (result.wasCalled) {
      return result.returned
    }
  }

  return void 0
}

export function except<EC extends ErrorConstructor, T, Args extends unknown[]>(
  errorConstructor: EC,
  handle: (error: InstanceType<EC>, ...args: Args) => T
) {
  return (error: InstanceType<EC>, ...args: Args): ExceptResult<T> =>
    error instanceof errorConstructor
      ? new ExceptResult(true, handle(error, ...args))
      : new ExceptResult(false)
}

interface Handler<T, Args extends unknown[]> {
  (error: any, ...args: Args): T
}

type ExceptHandler<T, Args extends unknown[]> = Handler<ExceptResult<T>, Args>

type CatchHandler<T, Args extends unknown[]> =
  | Handler<T, Args>
  | ExceptHandler<T, Args>[]
  | [...ExceptHandler<T, Args>[], Handler<T, Args>]

interface ErrorConstructor {
  new (message?: string): Error
}

class ExceptResult<T> {
  public readonly wasCalled: boolean
  public readonly returned?: T
  constructor(wasCalled: true, returned: T)
  constructor(wasCalled: false)
  constructor(wasCalled: boolean, returned?: T) {
    this.wasCalled = wasCalled
    this.returned = returned
  }
}
