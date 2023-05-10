import { accumulate } from '@johngw/async-iterator'
import * as pathHelper from 'path'
import readDir from '../readDir'

const fixturesDirname = pathHelper.relative(
  process.cwd(),
  pathHelper.join(__dirname, 'fixtures')
)

test('read a directory', async () => {
  await expect(accumulate(readDir(fixturesDirname))).resolves
    .toMatchInlineSnapshot(`
    [
      "src/__tests__/fixtures/a.txt",
      "src/__tests__/fixtures/deep/b.yaml",
    ]
  `)
})
