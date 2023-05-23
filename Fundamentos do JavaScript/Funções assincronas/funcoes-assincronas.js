// Funções assíncronas

function hello(name) {
    console.log(`Olá, ${name}`)
}

const processUserInput = async (callback) => {
    await fetch('https://api.github.com/users/octocat')
        .then(res => res.json())
        .then(json => callback(json.name))
        console.log('Fim do programa!')
}


processUserInput(hello)