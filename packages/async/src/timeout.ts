export default async function timeout(ms: number = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}
