/**
 * Try/catch as an expression that handles error types.
 */
export function tryCatch<T, Args extends unknown[]>(
  t: TryHandler<T, Args>,
  c: CatchHandler<T, Args>,
  ...args: Args
): T {
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
  t: TryHandler<T, Args>,
  f: FinallyHnadler<T, Args>,
  ...args: Args
): T {
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
  t: TryHandler<T, Args>,
  c: CatchHandler<T, Args>,
  f: FinallyHnadler<T, Args>,
  ...args: Args
): T {
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
  // @ts-ignore
): T {
  const excepts = Array.isArray(c) ? c : [c]

  for (const except of excepts) {
    const result = except(error, ...args)

    if (!(result instanceof TypedErrorResult)) {
      return result
    } else if (result.wasCalled) {
      return result.returned!
    }
  }
}

export function except<EC extends ErrorConstructor, T, Args extends unknown[]>(
  errorConstructor: EC,
  handle: (error: InstanceType<EC>, ...args: Args) => T
) {
  return (error: InstanceType<EC>, ...args: Args): TypedErrorResult<T> =>
    error instanceof errorConstructor
      ? new TypedErrorResult(true, handle(error, ...args))
      : new TypedErrorResult(false)
}

type TryHandler<T, Args extends unknown[]> = (...args: Args) => T

interface ErrorHandler<T, Args extends unknown[]> {
  (error: any, ...args: Args): T
}

type TypedErrorHandler<T, Args extends unknown[]> = ErrorHandler<
  TypedErrorResult<T>,
  Args
>

type CatchHandler<T, Args extends unknown[]> =
  | ErrorHandler<T, Args>
  | [...TypedErrorHandler<T, Args>[], ErrorHandler<T, Args>]

type FinallyHnadler<T, Args extends unknown[]> = (
  ...args: Args
) => T extends Promise<any> ? Promise<void> | void : void

interface ErrorConstructor {
  new (message?: string): Error
}

class TypedErrorResult<T> {
  public readonly wasCalled: boolean
  public readonly returned?: T
  constructor(wasCalled: true, returned: T)
  constructor(wasCalled: false)
  constructor(wasCalled: boolean, returned?: T) {
    this.wasCalled = wasCalled
    this.returned = returned
  }
}
