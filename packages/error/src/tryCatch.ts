export default function tryCatch<T, Args extends unknown[]>(
  t: (...args: Args) => T,
  c:
    | Handler<T, Args>
    | ExceptHandler<T, Args>[]
    | [...ExceptHandler<T, Args>[], Handler<T, Args>],
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

function catchHandler<T, Args extends unknown[]>(
  error: any,
  c:
    | Handler<T, Args>
    | ExceptHandler<T, Args>[]
    | [...ExceptHandler<T, Args>[], Handler<T, Args>],
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
