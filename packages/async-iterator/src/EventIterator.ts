import { defer } from '@johngw/async'

const Cancelled = Symbol('cancelled')

export default class EventIterator<T> implements AsyncIterable<T> {
  private events: T[] = []
  private arrived!: Promise<void>
  private publishArrival!: () => void
  private cancelled = false
  private cancelledPromise: Promise<typeof Cancelled>
  private readonly _cancel: (cancelled: typeof Cancelled) => void
  private readonly teardown: Teardown

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
  constructor(setup: Setup<T>) {
    const { promise: cancelledPromise, resolve: cancel } =
      defer<typeof Cancelled>()
    this.cancelledPromise = cancelledPromise
    this._cancel = cancel
    this.setupNextArrival()
    this.teardown = setup(this.push)
  }

  readonly cancel = async (): Promise<IteratorResult<T>> => {
    if (!this.cancelled) {
      this._cancel(Cancelled)
      this.teardown()
    }
    return { done: true, value: undefined }
  }

  readonly push = (event: T) => {
    this.events.push(event)
    this.publishArrival()
    this.setupNextArrival()
  }

  private setupNextArrival() {
    const { promise: arrived, resolve: publishArrival } = defer()
    this.arrived = arrived
    this.publishArrival = publishArrival
  }

  private readonly next = async (): Promise<IteratorResult<T>> => {
    if (this.events.length) {
      return { done: false, value: this.events.shift()! }
    }

    if (
      (await Promise.race([this.arrived, this.cancelledPromise])) === Cancelled
    ) {
      return { done: true, value: undefined }
    }

    return this.next()
  };

  [Symbol.asyncIterator]() {
    return {
      next: this.next,
      return: this.cancel,
    }
  }
}

type Setup<T> = (push: Pusher<T>) => Teardown
type Pusher<T> = (event: T) => void
type Teardown = () => void
