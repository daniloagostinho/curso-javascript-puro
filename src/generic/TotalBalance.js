const updateTotalBalance = (array, financialType) => {
    const total = calculateTotal(array);
    window[`total${capitalizeFirstLetter(financialType)}s`].add = {
        total: total
    }
}

const sumValues = (accumulator, currentValue) => accumulator + Number(currentValue.value);

const calculateTotal = (array) => {
    console.log('array -->> ', array)
    const financialArray = array;
    return financialArray ? financialArray.reduce(sumValues, 0) : 0;
}