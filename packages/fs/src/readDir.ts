import { readdir } from './promises'
import * as pathHelper from 'path'

export interface ReadDirOptions {
  recursive?: boolean
}

export default async function* readDir(
  dirname: string,
  { recursive = true }: ReadDirOptions = {}
): AsyncGenerator<string, void> {
  for (const entry of await readdir(dirname, { withFileTypes: true })) {
    const path = pathHelper.join(dirname, entry.name)
    if (entry.isDirectory() && recursive) yield* readDir(path, { recursive })
    else yield path
  }
}
