import Table from 'cli-table'

const lengths = [
  10,
  100,
  1000,
  10000,
  100000,
  1000000,
  10000000,
  20000000,
  30000000,
  32000000,
  33000000,
  33500000,
  34000000,
  35000000,
  40000000,
  50000000,
  60000000,
  70000000,
  80000000,
  99990000,
]

export default class Test {
  private results: { [testName: string]: number[] }

  constructor() {
    this.results = {}
  }

  case(name: string, test: (options: { length: number }) => void) {
    this.results[name] = []
    console.info(`# ${name}`)
    for (const length of lengths) {
      process.stdout.write(`${length} times`)
      const start = new Date()
      test({ length })
      const end = new Date()
      const ms = end.getTime() - start.getTime()
      console.info(':', ms, 'ms')
      this.results[name].push(ms)
    }
  }

  finish() {
    const table = new Table({ head: ['', ...lengths.map((x) => x.toString())] })
    table.push(...Object.entries(this.results).map(([k, v]) => ({ [k]: v })))
    console.info(table.toString())
  }
}
