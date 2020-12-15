import timeout from './timeout'

test('it waits in milliseconds', (done) => {
  setTimeout(() => done('it didnt resolve'), 20)
  timeout(10).then(done)
})
