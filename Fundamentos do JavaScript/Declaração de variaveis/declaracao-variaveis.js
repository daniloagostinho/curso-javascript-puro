// Variaveis
// var - escopo global
// let - escopo de função/bloco
// const - escopo de função/bloco - não pode reatribuir valores para constantes.
console.log(myVAR);

{
    var myVAR = 'Danilo';
    let myVARX = 'Danilo';
    myVARX = 'Silva'
    console.log(myVARX);
    const myVARY = 'Silva';
}


console.log(myVARY); // ReferenceError

let myVARD;
