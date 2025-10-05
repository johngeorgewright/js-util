import { readFile, readdir } from './promises.js'
import * as pathHelper from 'node:path'

export interface ReadFilesOptions {
  encoding?: BufferEncoding
  filter?(filename: string): boolean
  recursive?: boolean
  withFileNames?: boolean
}

export interface WithFileNamesResult<Contents extends string | Buffer> {
  contents: Contents
  fileName: string
}

export default function readFiles(
  dirname: string,
  options: ReadFilesOptions & { withFileNames: true; encoding: BufferEncoding }
): AsyncGenerator<WithFileNamesResult<string>, void>

export default function readFiles(
  dirname: string,
  options: ReadFilesOptions & { withFileNames: true }
): AsyncGenerator<WithFileNamesResult<Buffer>, void>

export default function readFiles(
  dirname: string,
  options: ReadFilesOptions & { encoding: BufferEncoding }
): AsyncGenerator<string, void>

export default function readFiles(
  dirname: string,
  options?: Omit<ReadFilesOptions, 'encoding'>
): AsyncGenerator<Buffer, void>

export default async function* readFiles(
  dirname: string,
  {
    encoding,
    filter = () => true,
    recursive = true,
    withFileNames = false,
  }: any = {}
): AsyncGenerator<
  Buffer | string | { contents: Buffer | string; fileName: string },
  void
> {
  for (const entry of await readdir(dirname, { withFileTypes: true })) {
    const path = pathHelper.join(dirname, entry.name)
    if (entry.isDirectory()) {
      if (recursive)
        yield* readFiles(path, { encoding, filter, recursive, withFileNames })
    } else if (filter(path))
      yield withFileNames
        ? {
            contents: await readFile(path, { encoding }),
            fileName: path,
          }
        : readFile(path, { encoding })
  }
}
