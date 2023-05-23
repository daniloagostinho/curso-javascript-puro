// Métodos de Array

// MAP
let string = ['Danilo', 'Danubio', 'Raphaella', 'Juliano'];
let stringFormated = string.map(s => s.toUpperCase())

console.log(stringFormated)
console.log(string)

// FILTER
let ages = [18, 10, 30, 5, 40];
let allowed = ages.filter(age => age > 18);


console.log(allowed);

// EVERY
let ages2 = [56, 28, 30, 50, 40];
let allAllowed = ages2.every(age => age > 18)

console.log(allAllowed)

// REDUCE
let values = [200, 100, 100];
let sum = values.reduce((total, number) => total + number, 100);

console.log(sum)


