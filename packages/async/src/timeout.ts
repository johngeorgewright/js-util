export default async function timeout(ms: number = 0) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms)
  })
}
