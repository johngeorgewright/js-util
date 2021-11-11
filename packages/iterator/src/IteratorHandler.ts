import { Last } from 'ts-toolbelt/out/List/Last'
import { Length } from 'ts-toolbelt/out/List/Length'
import { Pop } from 'ts-toolbelt/out/List/Pop'
import { Merge } from 'ts-toolbelt/out/Object/Merge'
import { ListOf } from 'ts-toolbelt/out/Union/ListOf'

/**
 * Handling iteration as if it were events.
 *
 * Every element "yield'd" from an iterator must be a binary tuple,
 * where the 1st element is a symbol (representing the event) and the 2nd
 * is the value "emitted".
 *
 * You may only have 1 handler for each event and the handler can return
 * something to the iterator if neccessary.
 *
 * @example
 * const Foo = Symbol('foo')
 * const Bar = Symbol('bar')
 *
 * type MyGenerator = Generator<
 *   | [typeof Foo, string]
 *   | [typeof Bar, number],
 *   any,
 *   undefined
 * >
 *
 * function* myGenerator(): MyGenerator {
 *   yield [Foo, 'foo']
 *   yield [Bar, 123]
 * }
 *
 * const handler = IteratorHandler
 *   .create(myGenerator())
 *   .handle(Foo, (value) => console.info(value))
 *   .handle(Bar, (num) => console.info(num))
 *   .run()
 */
export default class IteratorHandler<T extends [symbol, unknown], R> {
  #iterator: Gen<T, R>
  #handlers: Handlers<T>

  static create<T extends [symbol, unknown], R>(iterator: Gen<T, R>) {
    return new IteratorHandler(iterator, {})
  }

  constructor(iterator: Gen<T, R>, handlers: Handlers<T>) {
    this.#iterator = iterator
    this.#handlers = handlers
  }

  handle<EventName extends keyof Events<T>>(
    eventName: EventName,
    handler: Handler<Events<T>[EventName]>
  ) {
    return new IteratorHandler(this.#iterator, {
      ...this.#handlers,
      [eventName]: handler,
    })
  }

  run() {
    let item = this.#iterator.next()
    while (!item.done) {
      item = this.#iterator.next(
        this.#emit(
          item.value[0] as keyof Events<T>,
          item.value[1] as Events<T>[keyof Events<T>]
        )
      )
    }
  }

  #emit<EventName extends keyof Events<T>>(
    eventName: EventName,
    value: Events<T>[EventName]
  ) {
    return this.#handlers[eventName]?.(value)
  }
}

type _Events<
  L extends readonly [symbol, unknown][],
  R extends Record<symbol, unknown>
> = Length<L> extends 0
  ? R
  : Last<L> extends [infer K, infer V]
  ? K extends symbol
    ? _Events<Pop<L>, Merge<R, Record<K, V>>>
    : never
  : never

type Events<T extends [symbol, unknown]> = _Events<ListOf<T>, {}>

type Handler<T> = (value: T) => any

type Handlers<T extends [symbol, unknown]> = Partial<{
  [K in keyof Events<T>]: Handler<Events<T>[K]>
}>

type Gen<T extends [symbol, unknown], R> = Generator<T, any, R>
