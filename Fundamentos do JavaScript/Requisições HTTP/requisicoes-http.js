// Requisições HTTP


// Fetch API
// Requisição GET
fetch('https://jsonplaceholder.typicode.com/todos/1', {
    method: 'GET'
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error(error))

// Requisição POST

let dados = {
    title: 'foo',
    body: 'bar',
    userId: 1
}

fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(dados)

})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error(error))
