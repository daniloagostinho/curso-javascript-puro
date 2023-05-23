// Manipulação DOM

// Selecionar elementos

let h1 = document.querySelector('h1');
let allH1 = document.querySelectorAll('h1');
let h1Id = document.getElementById('myId');

// for(const el of allH1) {
//     console.log(el.textContent);
// }

// console.log(allH1);
console.log(h1Id);

// Alterar contúdos

h1.textContent = 'Novo texto';
let button = document.querySelector('button');
button.textContent = 'Novo texto do botão';

// Alterar/Adicionar/Remover atributos

let link = document.querySelector('a');

link.setAttribute('href', 'https://www.google.com');
link.removeAttribute('href')

// Criar/Remover elementos do DOM

const section = document.createElement('section');

let h1Section = document.createElement('h1');
let hr = document.createElement('hr');

h1Section.textContent = 'Titulo da section';

document.body.appendChild(section);

let sectionSelected = document.querySelector('section');

sectionSelected.append(h1Section)

sectionSelected.append(hr)

document.body.removeChild(sectionSelected)

// Adicionar/Remover classes

let img = document.querySelector('img');

img.classList.add('size');
img.classList.remove('size')

img.setAttribute('src', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Google_Chrome_icon_%28February_2022%29.svg/2048px-Google_Chrome_icon_%28February_2022%29.svg.png')