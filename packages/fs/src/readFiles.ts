import { readFile, readdir } from './promises'
import * as pathHelper from 'path'

export interface ReadFilesOptions {
  encoding?: BufferEncoding
  filter?(filename: string): boolean
  recursive?: boolean
}

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
  { encoding, filter = () => true, recursive = true }: any = {}
): AsyncGenerator<Buffer | string, void> {
  for (const entry of await readdir(dirname, { withFileTypes: true })) {
    const path = pathHelper.join(dirname, entry.name)

    if (entry.isDirectory()) {
      if (recursive) {
        yield* readFiles(path, { encoding, filter, recursive })
      }
    } else if (filter(path)) {
      yield readFile(path, { encoding })
    }
  }
}
