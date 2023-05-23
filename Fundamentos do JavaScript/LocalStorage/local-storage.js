// Local Storage

// Armazena no localStorage
let person = {
    name: 'Danilo',
    age: 30
}

localStorage.setItem('pessoa', JSON.stringify(person));

// Acessa os dados

let getName = localStorage.getItem('nome');
let getPerson = JSON.parse(localStorage.getItem('pessoa'))

console.log(getName)
console.log(getPerson)

// Remove os dados

localStorage.removeItem('nome');