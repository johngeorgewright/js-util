import { AbortController, AbortSignal } from 'node-abort-controller'

/**
 * Creates a new AbortController that responds to a signal.
 */
export default function abortControllerFromSignal(signal: AbortSignal) {
  const abortController = new AbortController()
  if (signal.aborted) abortController.abort()
  else signal.addEventListener('abort', () => abortController.abort())
  return abortController
}
