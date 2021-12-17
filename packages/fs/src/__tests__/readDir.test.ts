import { accumulate } from '@johngw/async-iterator'
import * as pathHelper from 'path'
import readDir from '../readDir'

const fixturesDirname = pathHelper.join(__dirname, 'fixtures')

test('read a directory', async () => {
  await expect(accumulate(readDir(fixturesDirname))).resolves
    .toMatchInlineSnapshot(`
          Array [
            Dirent {
              "name": "a.txt",
              Symbol(type): 1,
            },
            Dirent {
              "name": "b.yaml",
              Symbol(type): 1,
            },
            Dirent {
              "name": "deep",
              Symbol(type): 2,
            },
          ]
        `)
})
