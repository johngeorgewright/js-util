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
