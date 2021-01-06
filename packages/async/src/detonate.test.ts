import detonate from './detonate'

test('it throws after an amount of ms', (done) => {
  detonate(10).then(
    () => done('it resolved instead of rejecting'),
    (error) => {
      expect(error).toBeInstanceOf(Error)
      expect(error.message).toBe('Exceeded 10ms')
      done()
    }
  )
  setTimeout(() => done('it didnt throw'), 20)
})
