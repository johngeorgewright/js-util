# @johngw/array

## filterMap

> Filters and maps an array in 1 loop

```typescript
filterMap(
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  (x) => x > 5,
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
