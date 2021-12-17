import { accumulate } from '@johngw/async-iterator'
import * as pathHelper from 'path'
import readDir from '../readDir'

const fixturesDirname = pathHelper.join(__dirname, 'fixtures')

test('read a directory', async () => {
  await expect(accumulate(readDir(fixturesDirname))).resolves
    .toMatchInlineSnapshot(`
          Array [
            "/Users/john.wright/Workspace/js-util/packages/fs/src/__tests__/fixtures/a.txt",
            "/Users/john.wright/Workspace/js-util/packages/fs/src/__tests__/fixtures/deep/b.yaml",
          ]
        `)
})
