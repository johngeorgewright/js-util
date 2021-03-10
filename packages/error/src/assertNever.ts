import CompileError from './CompileError'

export default function assertNever<T extends never, M extends string>(
  _message: M,
  _item: T
): T

export default function assertNever<T, M extends string>(
  _message: M,
  _item: T
): CompileError<[M, T]>

export default function assertNever(_message: string, _item: unknown) {
  return {}
}
