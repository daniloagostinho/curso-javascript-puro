// Escopo Léxico

var myVAR = 'Danilo';

function outerFunction() {
    let outerVariable = 'Eu sou de fora!';
    console.log(myVAR);
    function innnerFunction() {
        console.log(outerVariable);
        console.log(myVAR);

    }

    innnerFunction();
}

outerFunction();

// Escopo de bloco

{
    let blockScopedVariable = 'Eu sou visivel dentro deste bloco';
    console.log(blockScopedVariable)
    console.log(myVAR);
}

console.log(blockScopedVariable)