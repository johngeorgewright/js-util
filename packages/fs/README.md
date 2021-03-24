# @johngw/fs

File System Utilities

## `readFiles(dirname: string, { recursive?: boolean, filter?: (name: string) => boolean, encoding: BufferEncoding }): AsyncGenerator<Buffer | string, void>

Read all files in a directory.
