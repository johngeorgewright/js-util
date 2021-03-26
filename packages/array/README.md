# @johngw/array

## filterMap

> Filters and maps an array in 1 loop

```typescript
filterMap(
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  (x) as is number => x > 5,
  (x) => `${x} bottles`
)
/*
  [
    '6 bottles',
    '7 bottles',
    '8 bottles',
    '9 bottles',
  ]
*/
```

## filterReduce

> Filters and reduces an array in 1 loop

```typescript
filterReduce(
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  0,
  (_, x) => x < 5,
  (sum, x) => sum + x
)
// 10
```

## Builder

> Performant array builder

This is used internally to build arrays. It performs 3x faster than just appending items to array with undefined length.

```typescript
const builder = new Builder<number>(10_000)

for (let i = 0; i < 10_000; i++) {
  builder.add(i)
}

builder.finish()
// [0, 1, 2, 3, ..., 9999]
```
