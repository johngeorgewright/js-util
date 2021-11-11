export default function take<T>(amount: number) {
  return function* (generator: Generator<T>) {
    for (let i = 0; i < amount; i++) {
      let { done, value } = generator.next()
      if (done) return
      yield value
    }
  }
}
