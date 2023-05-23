// Manipulção de Strings

// replace
let minhaString = 'Olá, mundo, mundo, mundo!';

// minhaString = minhaString.replace('mundo', 'JavaScript');
minhaString = minhaString.replace(/mundo/g, 'JavaScript');

console.log(minhaString)

// substring

let minhaString2 = 'olá, mundo!';

let substr = minhaString2.substring(4, 11);
let primeiraLetraMaiscula = minhaString2.substring(0, 1).toUpperCase() + minhaString2.substring(1);

console.log(primeiraLetraMaiscula)

// toUpperCase

let minhaString3 = 'olá, mundo!';

minhaString3 = minhaString3.toUpperCase();

console.log(minhaString3)

