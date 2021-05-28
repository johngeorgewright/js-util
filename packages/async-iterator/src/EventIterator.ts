import { defer } from '@johngw/async'

const Cancelled = Symbol('cancelled')

export default class EventIterator<T> {
  private events: T[] = []
  private arrived!: Promise<void>
  private publishArrival!: () => void
  private cancelled: Promise<typeof Cancelled>
  private teardown: Teardown

  public readonly cancel: () => void

  constructor(setup: Setup<T>) {
    const { promise: cancelled, resolve: cancel } = defer()
    this.cancelled = cancelled.then(() => Cancelled)
    this.cancel = cancel
    this.setupNextArrival()
    this.teardown = setup(this.push)
  }

  private setupNextArrival() {
    const { promise: arrived, resolve: publishArrival } = defer()
    this.arrived = arrived
    this.publishArrival = publishArrival
  }

  readonly push = (event: T) => {
    this.events.push(event)
    this.publishArrival()
    this.setupNextArrival()
  }

  private readonly next = async (): Promise<IteratorResult<T>> => {
    if (this.events.length) {
      return { done: false, value: this.events.shift()! }
    }

    if ((await Promise.race([this.arrived, this.cancelled])) === Cancelled) {
      this.teardown()
      return { done: true, value: undefined }
    }

    return this.next()
  };

  [Symbol.asyncIterator]() {
    return {
      next: this.next,
    }
  }
}

type Setup<T> = (push: Pusher<T>) => Teardown
type Pusher<T> = (event: T) => void
type Teardown = () => void
