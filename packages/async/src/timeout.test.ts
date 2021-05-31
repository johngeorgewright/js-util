import timeout from './timeout'

test('it waits in milliseconds', async () => {
  await Promise.race([
    timeout(10),
    new Promise((_, reject) =>
      setTimeout(() => reject('it didnt resolve'), 20)
    ),
  ])
})
