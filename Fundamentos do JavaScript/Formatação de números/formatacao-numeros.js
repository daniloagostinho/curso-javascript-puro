// Formatação de números

// toFixed
let num = 12.3910018;

let numFormated = num.toFixed(2)

console.log(typeof numFormated);

//parseFloat

let myString = '10.239787';

let numFloat = parseFloat(myString)

console.log(typeof  numFloat)

// Intl.NumberFormat
let myNum = 12343.13454;

let numPtFormated = new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(myNum);
// let numPtFormated = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(myNum)

console.log(numPtFormated)