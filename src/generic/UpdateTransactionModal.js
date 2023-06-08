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

const selectUpdateInputsDom = (financialType) => {
    const income = document.querySelector('.income-update-category').value;
    const value = document.querySelector(`.valueUpdate${capitalizeFirstLetter(financialType)}`).value;
    const dueDate = document.querySelector(`.dueUpdate${capitalizeFirstLetter(financialType)}`).value;
    const paymentMethod = financialType === 'income' ? document.querySelector('.income-update-payment-method-category').value : null;
    const expense = financialType === 'expense' ? document.querySelector('.expenseUpdate').value: null;
    const category = financialType === 'expense' ? document.querySelector('.expense-update-category').value: null;
    const user = localStorage.getItem('user');

    if (financialType === 'income') {
        return {
            income, 
            value,
            dueDate,
            paymentMethod,
            user
        }
    }

    return {
        expense,
        category,
        value,
        dueDate,
        user
    }

}

const generateUpdatePayload = (financialType) => {
    const selectedInputs = selectUpdateInputsDom(financialType);
    const genaretePortugueseData = generatePortugueseDateFormatTransaction(selectedInputs.dueDate);
    const dateSelected = generateDateForTransaction(selectedInputs.dueDate);

    const valueUpdateInput = document.querySelector(`.valueUpdate${capitalizeFirstLetter(financialType)}`).value;

    const valueWithoutSymbol = valueUpdateInput.replace(/[^\d,]/g, '');
    const numericValue = valueWithoutSymbol.replace(',', '.');
    const valueDialogUpdate = parseFloat(numericValue).toFixed(2);
    console.log(valueDialogUpdate);

    const payload = {
        user: {
            title: selectedInputs.user,
            month: {
                title: dateSelected.month,
                year: dateSelected.year,
                listMonth: {
                    ...financialType === 'income' ? { income: selectedInputs.income, paymentMethod: selectedInputs.paymentMethod } :
                    { expense: selectedInputs.expense, category: selectedInputs.category },
                    value: parseFloat(valueDialogUpdate).toFixed(2),
                    dueDate: genaretePortugueseData,
                    ...financialType === 'income' ? {paymentMethod: selectedInputs.paymentMethod} : {}

                }
            }
        }
    }

    return payload;

}

const updateTransaction = async (financialType) => {
    // TODO
    const url = `${window.apiURL}/update/${financialType}s/` + window[`${financialType}Id`];
    const payload = generateUpdatePayload(financialType);

    try {
        await window.updateRecords(url, payload)
            .then(response => response.json())
            .then(response => console.log(response))
    } catch (error) {
        console.log(error)
    }

} 
