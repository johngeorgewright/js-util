import { expect, test } from 'vitest'
import accumulate from './accumulate.js'
import filter from './filter.js'

test('filtering results', async () => {
  async function* gen() {
    yield 'mung'
    yield 'face'
  }

  const iterator = filter(gen(), (x): x is 'face' => x === 'face')

  expect(await accumulate(iterator)).toEqual(['face'])
})
