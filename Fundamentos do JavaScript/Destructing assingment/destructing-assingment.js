// /Destructing assingment

const [one, two, ...other] = [10, 1000, 200, 30000];


// let one = arr[0];
// let two = arr[1];

console.log(one, two, other)

const obj = {user: 'Danilo', age: 31}


const { user, age } = obj;

const obj2 = {...obj}

console.log(user, age)