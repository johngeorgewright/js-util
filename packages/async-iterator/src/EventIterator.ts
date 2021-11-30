import { defer } from '@johngw/async'
import { AbortSignal } from 'node-abort-controller'

const Cancelled = Symbol('cancelled')

export default class EventIterator<T> implements AsyncIterableIterator<T> {
  #events: T[] = []
  #arrived!: Promise<void>
  #publishArrival!: () => void
  #cancelled = false
  #cancelledPromise: Promise<typeof Cancelled>
  readonly #cancel: (cancelled: typeof Cancelled) => void
  readonly #teardown: Teardown

  /**
   * Easy way of turning callback style execution in to async iterables.
   *
   * For example, take the following problem:
   *
   * @example
   * async function* yieldEveryClick() {
   *   const el = document.getElementById('some-id')
   *   el.addEventListener('click', () => {
   *     // THIS CANNOT BE DONE!!!
   *     yield 'clicked'
   *   })
   * }
   *
   * // The above problem will take some work with wrapping everything in promises
   * // and manually writing the iterator implementation.
   * //
   * // Instead, one can use the `EventIterator`:
   * const yieldEveryClick = () => new EventIterator((push) => {
   *   const el = document.getElementById('some-id')
   *   const fn = () => push('clicked')
   *   el.addEventListener('click', fn)
   *   return () => el.removeEventListener('click', fn)
   * })
   *
   * // Now one can iterate through all the events `push`ed. You can also manually
   * // cancel the iteration where infinite loops are possible.
   * const iterator = yieldEveryClick()
   * setTimeout(() => iterator.cancel(), 20000)
   * for await (const click of iterator) {
   *   // ...
   * }
   */
  constructor(setup?: Setup<T>, signal?: AbortSignal) {
    const { promise: cancelledPromise, resolve: cancel } =
      defer<typeof Cancelled>()
    this.#cancelledPromise = cancelledPromise
    this.#cancel = cancel
    this.#setupNextArrival()
    this.#teardown =
      (setup && setup(this.push, () => setImmediate(this.cancel))) || (() => {})
    if (signal) {
      if (signal.aborted) this.cancel()
      else signal.addEventListener('abort', this.cancel)
    }
  }

  readonly cancel = async (): Promise<IteratorResult<T>> => {
    if (!this.#cancelled) {
      this.#cancelled = true
      this.#cancel(Cancelled)
      this.#teardown()
    }
    return { done: true, value: undefined }
  }

  readonly return = this.cancel

  readonly push = (event: T) => {
    if (!this.#cancelled) {
      this.#events.push(event)
      this.#publishArrival()
      this.#setupNextArrival()
    }
  }

  readonly next = async (): Promise<IteratorResult<T>> => {
    if (this.#events.length) {
      return { done: false, value: this.#events.shift()! }
    }

    if (
      (await Promise.race([this.#arrived, this.#cancelledPromise])) ===
      Cancelled
    ) {
      return { done: true, value: undefined }
    }

    return this.next()
  };

  [Symbol.asyncIterator]() {
    return this
  }

  #setupNextArrival() {
    const { promise: arrived, resolve: publishArrival } = defer()
    this.#arrived = arrived
    this.#publishArrival = publishArrival
  }
}

type Setup<T> = (push: Pusher<T>, cancel: () => {}) => Teardown | void
type Teardown = () => void
type Pusher<T> = (event: T) => void
