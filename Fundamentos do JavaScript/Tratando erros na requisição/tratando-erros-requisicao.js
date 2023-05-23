// Tratando erros na requisição

const fetchData = async () => {
    // Possível código que geraá um erro:
    try {
        let response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
        let data = await response.json();
        console.log(data);
    } catch(error) {
        // captura do erro
        console.error('Aconteceu um erro: ', error)
    }
}

fetchData();