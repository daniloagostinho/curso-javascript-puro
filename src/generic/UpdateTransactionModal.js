const createCheckUpdate = (financialType) => {
    window[`${financialType}Save`] = new Proxy({}, {
        set: function (target, property, value) {
            console.log(value)
            fillFormTransaction(financialType, value);
            target[property] = value;
        }
    })
}

const parseLocalDateStringTransactins = (dateString) => {
    const [day, month, year] = dateString.split('/').map(Number);

    return new Date(year, month - 1, day);
}

const fillFormTransaction = (financialType, transactionValue) => {
    window[`${financialType}Id`] = transactionValue.id;
    const { value, dueDate } = transactionValue;
    const dateToInsertField = parseLocalDateStringTransactins(dueDate);
    const formattedDate = dateToInsertField.toISOString().substring(0, 10);

    if (financialType === 'income') {
        const { income, paymentMethod } = transactionValue;

        window.typeIncomeSelected = income;
        updateSelectType('income', income);
        updateSelectType('payment-method', paymentMethod);
    } else if (financialType === 'expense') {
        const { expense, category } = transactionValue;

        window.typeExpenseSelected = expense;
        updateSelectType('category', category);
        document.querySelector('.expenseUpdate').value = expense;
    }

    document.querySelector(`.valueUpdate${capitalizeFirstLetter(financialType)}`).value = value;
    document.querySelector(`.${financialType === 'income' ? 'dueUpdateIncome' : 'dueUupdateExpense'}`).value = formattedDate;
}

const updateSelectType = (financialType, optionSelected) => {
    const selectUpdate = financialType === 'payment-method' ? document.querySelector(`.select-container-payment-method-update > select`)
        : document.querySelector(`.select-update-container-${financialType} > select`);


        for (let i = 0; i < selectUpdate.length; i++) {
            const option = selectUpdate.options[i];

            if (option.value === optionSelected) {
                option.selected = true;
                break;
            }
        }
}