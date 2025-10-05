import { expect, test } from 'vitest'
import detonateRace from './detonateRace.js'
import timeout from './timeout.js'

test('it rejects after a number of ms', () =>
  detonateRace(timeout(20), 10).then(
    () => { throw new Error('it resolved instead of rejected') },
    (error) => {
      expect(error.isTimeoutError).toBe(true)
    }
  )
)

test('it resolves within a number of ms', () =>
  detonateRace(timeout(10), 20)
)
