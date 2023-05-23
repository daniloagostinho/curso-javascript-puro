// Callback


function hello(name) {
    console.log(`Olá, ${name}`)
}

function processUserInput(callback) {
    let name = prompt('Por favor informe um nome!');
    callback(name)
}


processUserInput(hello)