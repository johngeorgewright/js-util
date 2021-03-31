export default function tryCatch<T>(t: () => T, c: (error: any) => T) {
  try {
    return t()
  } catch (error) {
    return c(error)
  }
}
