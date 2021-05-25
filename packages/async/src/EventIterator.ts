import defer from './defer'

const Cancelled = Symbol('cancelled')

export default class EventIterator<T> {
  private events: T[] = []
  private next: Promise<void>
  private pull: () => void
  private cancelled: Promise<typeof Cancelled>
  private teardown: Teardown

  public readonly cancel: () => void

  constructor(setup: Setup<T>) {
    const { promise: next, resolve: pull } = defer()
    this.next = next
    this.pull = pull

    const { promise: cancelled, resolve: cancel } = defer()
    this.cancelled = cancelled.then(() => Cancelled)
    this.cancel = cancel

    this.teardown = setup(this.push)
  }

  push = (event: T) => {
    this.events.push(event)
    this.pull()
    const { promise, resolve } = defer()
    this.next = promise
    this.pull = resolve
  };

  [Symbol.asyncIterator]() {
    const next = async (): Promise<IteratorResult<T>> => {
      if (this.events.length) {
        return { done: false, value: this.events.shift()! }
      }

      if ((await Promise.race([this.next, this.cancelled])) === Cancelled) {
        this.teardown()
        return { done: true, value: undefined }
      }

      return { done: false, value: this.events.shift()! }
    }

    return {
      next,
    }
  }
}

type Setup<T> = (push: Pusher<T>) => Teardown
type Pusher<T> = (event: T) => void
type Teardown = () => void
