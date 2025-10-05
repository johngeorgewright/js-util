import * as fs from 'node:fs'
import { promisify } from 'node:util'

export const readFile = promisify(fs.readFile)
export const readdir = promisify(fs.readdir)
