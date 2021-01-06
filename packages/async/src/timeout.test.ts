import timeout from './timeout'

test('it waits in milliseconds', (done) => {
  timeout(10).then(done, done)
  setTimeout(() => done('it didnt resolve'), 20)
})
