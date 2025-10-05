import Builder from '@johngw/array/Builder'
import Test from './ArrayTest.js'

const test = new Test()

test.case('Array(<num>)[i]=x', ({ length }) => {
  const array = new Array<number>(length)
  for (let i = 0; i < length; i++) {
    array[i] = i
  }
  array.length = length
})

test.case('[][i]=x', ({ length }) => {
  const array: number[] = []
  for (let i = 0; i < length; i++) {
    array[i] = i
  }
})

test.case('[].push(x)', ({ length }) => {
  const array: number[] = []
  for (let i = 0; i < length; i++) {
    array.push(i)
  }
})

test.case('Array.from({length},()=>x)', ({ length }) => {
  Array.from({ length }, (_, i) => i)
})

test.case('function*', ({ length }) => {
  Array.from(
    (function* () {
      for (let i = 0; i < length; i++) {
        yield i
      }
    })()
  )
})

test.case('new Builder()', ({ length }) => {
  const builder = new Builder<number>(length)
  for (let i = 0; i < length; i++) {
    builder.add(i)
  }
  builder.finish()
})

test.finish()
