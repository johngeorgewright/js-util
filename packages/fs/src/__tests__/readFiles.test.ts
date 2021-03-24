import * as pathHelper from 'path'
import readFiles from '../readFiles'

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
