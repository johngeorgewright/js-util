import { expect, test } from 'vitest'
import abortControllerFromSignal from './abortControllerFromSignal.js'

test("the controller aborts it's signals when the given signal is aborted", () => {
  const originalController = new AbortController()
  const originalSignal = originalController.signal
  const newController = abortControllerFromSignal(originalSignal)
  const newSignal = newController.signal
  expect(originalSignal.aborted).toBe(false)
  expect(newSignal.aborted).toBe(false)
  originalController.abort()
  expect(newSignal.aborted).toBe(true)
})

test('the new signal will be already aborted if the given signal was already aborted', () => {
  const originalController = new AbortController()
  const originalSignal = originalController.signal
  originalController.abort()
  const newController = abortControllerFromSignal(originalSignal)
  const newSignal = newController.signal
  expect(originalSignal.aborted).toBe(true)
  expect(newSignal.aborted).toBe(true)
})
