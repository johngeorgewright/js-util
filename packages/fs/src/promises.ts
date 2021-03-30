import * as fs from 'fs'
import { promisify } from 'util'

export const readFile = promisify(fs.readFile)
export const readdir = promisify(fs.readdir)
