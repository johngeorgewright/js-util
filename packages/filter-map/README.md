# @johngw/filter-map

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
