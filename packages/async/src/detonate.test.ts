import detonate from './detonate'

test('it throws after an amount of ms', async () => {
  await Promise.race([
    detonate(10).then(
      () => {
        throw new Error('it resolved instead of rejecting')
      },
      (error) => {
        expect(error).toBeInstanceOf(Error)
        expect(error.message).toBe('Exceeded 10ms')
      }
    ),
    new Promise((_, reject) =>
      setTimeout(() => {
        reject('it didnt throw')
      }, 20)
    ),
  ])
})
