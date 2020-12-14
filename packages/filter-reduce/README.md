# @johngw/filter-reduce

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
