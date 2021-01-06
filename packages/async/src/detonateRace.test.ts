import detonateRace from './detonateRace'
import timeout from './timeout'

test('it rejects after a number of ms', (done) => {
  detonateRace(timeout(20), 10).then(
    () => done('it resolved instead of rejected'),
    (error) => {
      expect(error.message).toBe('Exceeded 10ms')
      done()
    }
  )
})

test('it resolves within a number of ms', (done) => {
  detonateRace(timeout(10), 20).then(done, done)
})
