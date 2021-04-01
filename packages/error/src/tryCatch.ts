export default function tryCatch<Args extends unknown[], T>(
  t: (...args: Args) => T,
  c: (error: any, ...args: Args) => T,
  ...args: Args
) {
  try {
    return t(...args)
  } catch (error) {
    return c(error, ...args)
  }
}
