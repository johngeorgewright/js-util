import * as pathHelper from 'path'
import readFiles, { WithFileNamesResult } from '../readFiles'

const fixturesDirname = pathHelper.join(__dirname, 'fixtures')

test('recursively read buffers', async () => {
  const content: string[] = []

  for await (const file of readFiles(fixturesDirname)) {
    content.push(file.toString().trim())
  }

  expect(content).toMatchInlineSnapshot(`
    Array [
      "I'm A",
      "---
    name: B",
    ]
  `)
})

test('flat lookup', async () => {
  const content: string[] = []
  const gen = readFiles(fixturesDirname, { recursive: false })

  for await (const file of gen) {
    content.push(file.toString().trim())
  }

  expect(content).toMatchInlineSnapshot(`
    Array [
      "I'm A",
    ]
  `)
})

test('filtering filenames', async () => {
  const content: string[] = []
  const gen = readFiles(fixturesDirname, {
    filter: (filename) => filename.endsWith('.yaml'),
  })

  for await (const file of gen) {
    content.push(file.toString().trim())
  }

  expect(content).toMatchInlineSnapshot(`
    Array [
      "---
    name: B",
    ]
  `)
})

test('encoding', async () => {
  const content: string[] = []
  const gen = readFiles(fixturesDirname, {
    encoding: 'utf-8',
  })

  for await (const file of gen) {
    content.push(file.trim())
  }

  expect(content).toMatchInlineSnapshot(`
    Array [
      "I'm A",
      "---
    name: B",
    ]
  `)
})

test('withFileNames', async () => {
  const content: WithFileNamesResult<string>[] = []
  for await (const result of readFiles(fixturesDirname, {
    encoding: 'utf-8',
    withFileNames: true,
  }))
    content.push({
      contents: result.contents,
      fileName: pathHelper.relative(__filename, result.fileName),
    })
  expect(content).toMatchInlineSnapshot(`
    Array [
      Object {
        "contents": "I'm A
    ",
        "fileName": "../fixtures/a.txt",
      },
      Object {
        "contents": "---
    name: B
    ",
        "fileName": "../fixtures/deep/b.yaml",
      },
    ]
  `)
})
