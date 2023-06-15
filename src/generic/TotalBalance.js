const updateTotalBalance = (array, financialType) => {
    const total = calculateTotal(array);
    window[`total${capitalizeFirstLetter(financialType)}s`].add = {
        total: total
    }
}

const sumValues = (accumulator, currentValue) => accumulator + Number(currentValue.value);

const calculateTotal = (array) => {
    const financialArray = array;
    return financialArray ? financialArray.reduce(sumValues, 0) : 0;
}

const checkTotalBalance = (financialType) => {
    window[`total${capitalizeFirstLetter(financialType)}s`] = new Proxy({}, {
        set: function(target, property, value) {
            getTotalBalance(value.total, financialType);

            window[`total${capitalizeFirstLetter(financialType)}sVariable`] = value.total;

            setTimeout(() => {
                sumBalanceTotal();
            }, 100)

            target[property] = value;
        }
    })
}


const getTotalBalance = (totalBalance, financialType) => {
    let element;

    if (financialType === 'income') {
        element = '.total-income-balance';
    } else {
        element = '.total-expense-balance';
    }

    document.querySelector(element).innerHTML = currencyValue(totalBalance);
}