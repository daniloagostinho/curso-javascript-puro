// Eventos e manipuladores de eventos

// Atributos de eventos HTML
const myFunction = () => {
    console.log('cliquei no botão!')
}

const myFunctionSearch = (event) => {
    console.log(event.target.value)
}

// Manipulador de eventos

let button = document.getElementById('myButton')
let input = document.getElementById('myInput');

button.addEventListener('click', function() {
    console.log('Cliquei no botão com ID')
})

input.addEventListener('input', function(event) {
    console.log(event.target.value)
})