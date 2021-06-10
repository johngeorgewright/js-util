import iteratorRace from './iteratorRace'
import { timeout } from '@johngw/async'
import AbortController from 'node-abort-controller'

test('yielding all within a time limit', async () => {
  async function* gen() {
    yield 1
    yield 2
    yield 3
  }

  const results = []

  for await (const item of iteratorRace(gen(), 100)) {
    results.push(item)
  }

  expect(results).toEqual([1, 2, 3])
})

test('yielding some within a time limit', async () => {
  async function* gen() {
    yield 1
    await timeout(10)
    yield 2
  }

  const results = []

  for await (const item of iteratorRace(gen(), 5)) {
    results.push(item)
  }

  expect(results).toEqual([1])
})

test('aborting', async () => {
  async function* gen() {
    yield 1
    await timeout(10)
    yield 2
  }

  const abortController = new AbortController()
  const results = []

  timeout(5).then(() => abortController.abort())

  for await (const item of iteratorRace(gen(), 20, abortController.signal)) {
    results.push(item)
  }

  expect(results).toEqual([1])
})
