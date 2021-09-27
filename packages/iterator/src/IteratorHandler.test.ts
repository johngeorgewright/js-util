import IteratorHandler from './IteratorHandler'

test('simple iteration', () => {
  const Foo = Symbol('foo')
  const Bar = Symbol('bar')

  type MyGenerator = Generator<
    [typeof Foo, string] | [typeof Bar, number],
    any,
    undefined
  >

  function* myGenerator(): MyGenerator {
    yield [Foo, 'foo']
    yield [Bar, 123]
  }

  IteratorHandler.create(myGenerator())
    .handle(Foo, (value) => expect(value).toBe('foo'))
    .handle(Bar, (num) => expect(num).toBe(123))
    .run()
})

test('returning values', () => {
  const Foo = Symbol('foo')

  type MyGenerator = Generator<[typeof Foo, string], any, string>

  function* myGenerator(): MyGenerator {
    expect(yield [Foo, 'foo']).toBe('foo2')
  }

  IteratorHandler.create(myGenerator())
    .handle(Foo, (value) => value + '2')
    .run()
})
