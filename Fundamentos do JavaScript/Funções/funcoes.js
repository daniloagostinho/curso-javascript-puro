// Funções

// Função declarada

function myFunction() {
   return 'Danilo';
}

function myFunctionParameter(name, age) {
    return `Olá, ${name}, seja bem vindo, você tem ${age} anos! `;
}

console.log(myFunctionParameter('Vitor', 30))

// Função expressa

const myFunctionExpression = function(name, age) {
    return `Olá, ${name}, seja bem vindo, você tem ${age} anos! `;
}

const myFunctionArrow = (name, age) => name !== undefined && age !== undefined;


console.log(myFunctionArrow('Danilo', 30))
