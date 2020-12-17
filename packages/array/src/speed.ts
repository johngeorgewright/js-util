import Builder from './Builder'

console.info('push()')
let start = new Date()

let array = []
for (let i = 0; i < 999999; i++) {
  array.push(i)
}

let end = new Date()
console.info(end.getTime() - start.getTime())
array = []

console.info()
console.info('set length')
start = new Date()
array = new Array(1000099)
for (let i = 0; i < 999999; i++) {
  array[i] = i
}
array.length = 999998

end = new Date()
console.info(end.getTime() - start.getTime())

console.info()
console.info('builder')
start = new Date()
let builder = new Builder(1000099)
for (let i = 0; i < 999999; i++) {
  builder.add(i)
}
array = builder.finish()

end = new Date()
console.info(end.getTime() - start.getTime())
