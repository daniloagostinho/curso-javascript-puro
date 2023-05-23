// Trabalhando com datas

let dataAtual = new Date();

let dataFormatadaPtBR = dataAtual.toLocaleDateString('pt-BR');
let nomeMes = dataAtual.toLocaleDateString('pt-BR', {
    month: 'long'
})

console.log(dataAtual.getFullYear())
console.log(dataAtual.getMonth() + 1)
console.log(dataAtual.getDate())
console.log(dataAtual.getHours())
console.log(dataAtual.getMinutes())
console.log(dataAtual.getSeconds())
console.log(dataAtual.getMilliseconds())
console.log(dataFormatadaPtBR)
console.log(nomeMes.substring(0, 1).toUpperCase() + nomeMes.substring(1))