//Array

let person = ['Danilo', 30, true, function() {console.log('Trabalho com TI')}];

person.push('Gosto de caminhar!')
person.pop()
person.unshift('Gosto de caminhar!')

console.log(person)

person.forEach(function(p, index) {
    console.log(index, p);

    if(index === 4) {
        p();
    }
})
