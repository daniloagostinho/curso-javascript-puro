// Operador Spread (...)

// Arrays
let arr1 = [1, 2, 3]

let arr2 = [4, 5, 6]

let arrCompleted = [...arr1, ...arr2]

console.log(arrCompleted)

// Objetos

const obj1 = {foo1: 'bar', x: 42}
const obj2 = {foo2: 'baz', y: 13}

let cloneObj = {...obj1, ...obj2}

console.log(cloneObj)

