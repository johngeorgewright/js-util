# @johngw/fs

File System Utilities

## `readFiles(dirname: string, { recursive?: boolean, filter?: (name: string) => boolean, encoding?: BufferEncoding }): AsyncGenerator<Buffer | string, void>

Recursively read all files in a directory.

```typescript
for await (const fileContent of readFiles(__dirname, { encoding: 'utf-8' })) {
  // ...
}
```
