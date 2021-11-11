export default function take<T>(amount: number) {
  return function* (generator: Generator<T>) {
    let done: boolean | undefined = false
    let value: T

    for (let i = 0; !done && i < amount; i++) {
      ;({ done, value } = generator.next())
      if (done) return
      yield value
    }
  }
}
