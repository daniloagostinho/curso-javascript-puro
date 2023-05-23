// Objetos

let carro = {
    marca: 'Toyota',
    modelo: 'Corolla',
    ano: 2005,
    ligar: function() {
        console.log('O carro está ligado!')
    }
}

const criarPaylod = (marca, modelo, ano, typeCar) => {
    const type = typeCar === 'sedan' ? 'Carro grande' : 'Carro pequeno';

    return {
        [typeCar]: type,
        marca, 
        modelo, 
        ano
    }
}

console.log(carro['ano'])
console.log(criarPaylod('FIAT', 'UNO', 2006, 'sedan'))
console.log(criarPaylod('FIAT', 'UNO', 2006, 'hatch'))
