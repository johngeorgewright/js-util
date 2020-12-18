import Builder from '../../array/src/Builder'
import Test from './test'

const test = new Test()

test.case('set length & known indexes', ({ length }) => {
  const array = new Array(length)
  for (let i = 0; i < length; i++) {
    array[i] = i
  }
  array.length = length
})

test.case('setting unknown indexes', ({ length }) => {
  const array = []
  for (let i = 0; i < length; i++) {
    array[i] = i
  }
})

test.case('push()', ({ length }) => {
  const array = []
  for (let i = 0; i < length; i++) {
    array.push(i)
  }
})

test.case('new Builder()', ({ length }) => {
  const builder = new Builder(length)
  for (let i = 0; i < length; i++) {
    builder.add(i)
  }
  builder.finish()
})

test.finish()
