const createObjtransactionDetails = (financialType) => {
    const {
        income,
        expense,
        category,
        value,
        dueDate,
        currentFutureFixed,
        currentPastFixed,
        paymentMethod
    } = selectInputsDom(financialType);

    const transactionDetail = {
        value,
        dueDate,
        currentFutureFixed,
        currentPastFixed
    }

    if (financialType === 'income') {
        transactionDetail.income = income;
        transactionDetail.paymentMethod = paymentMethod;
    } else if (financialType === 'expense') {
        transactionDetail.expense = expense;
        transactionDetail.category = category
    }

    return transactionDetail;
}

const selectInputsDom = (financialType) => {
    const transaction = document.querySelector(`.${financialType}-add-category`).value
    const value = financialType === 'income' ? window.valueAddIncomeModal : window.valueAddExpenseModal;

    const paymentMethod = document.querySelector('.income-payment-method-category').value;
    const dueDate = document.querySelector(`.dueDate${capitalizeFirstLetter(financialType)}`).value;
    const category = financialType === 'expense' ? document.querySelector('.expense-add-category').value : null;
    const currentFutureFixed = document.querySelector(`.currentFutureFixed${capitalizeFirstLetter(financialType)}`).checked;
    const expense = financialType === 'expense' ? document.querySelector(`.expense`).value : null;
    const currentPastFixed = document.querySelector(`.currentPastFixed${capitalizeFirstLetter(financialType)}`).checked;
    const user = localStorage.getItem('user');


    const result = {
        [financialType]: transaction,
        value,
        dueDate,
        currentFutureFixed,
        currentPastFixed,
        user
    }

    if (financialType === 'expense') {
        result.category = category;
        result.expense = expense;
    } else if (financialType === 'income') {
        result.paymentMethod = paymentMethod;
    }

    return result;
}

const formatCurrency = (event, financialType) => {
    const filterValue = event.target.value.replace(/\D/g, '');

    const currency = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(parseFloat(filterValue / 100))


    event.target.value = currency;

    const valueFormated = parseFloat(filterValue / 100);

    if (financialType === 'income') {
        window.valueAddIncomeModal = valueFormated;
        return;
    } else if (financialType === 'expense') {
        window.valueAddExpenseModal = valueFormated;
    }

}

const toggleCheckboxes = (currentFutureSelector, currentPastSelector) => {
    const currentFutureCheckbox = document.querySelector(currentFutureSelector);
    const currentPastCheckbox = document.querySelector(currentPastSelector);

    if (currentFutureCheckbox) {
        currentFutureCheckbox.addEventListener('change', () => {
            if (currentFutureCheckbox.checked) {
                currentPastCheckbox.disabled = true;
            } else {
                currentPastCheckbox.disabled = false;
            }
        })
    }

    if (currentPastCheckbox) {
        currentPastCheckbox.addEventListener('change', () => {
            if (currentPastCheckbox.checked) {
                currentFutureCheckbox.disabled = true;
            } else {
                currentFutureCheckbox.disabled = false;
            }
        })
    }
}

const verifyFieldFillTransaction = (financialType, transactionDetails) => {
    const requiredFields = {
        income: ['income', 'value', 'dueDate'],
        expense: ['expense', 'category', 'value', 'dueDate']
    }

    const fieldsToCheck = requiredFields[financialType];

    return fieldsToCheck.every(field => transactionDetails[field] !== '' && transactionDetails[field] !== undefined)

}

const registerFixedTransaction = async (financialType) => {
    const selectInputs = selectInputsDom(financialType);
    const apiUrl = `${window.apiURL}/auth/${financialType}s`;


    const currentDate = new Date();
    const currentMonthIndex = currentDate.getMonth();

    if (selectInputs.currentFutureFixed) {
        const futureMonths = window.months.slice(currentMonthIndex);
        await registerTransactions(apiUrl, financialType, selectInputs, futureMonths)
    } else if (selectInputs.currentPastFixed) {
        const pastAndCurrentMonths = window.months;
        await registerTransactions(apiUrl, financialType, selectInputs, pastAndCurrentMonths)
    }

    clearForm(financialType)
}

const clearForm = (financialType) => {
    window[`add${capitalizeFirstLetter(financialType)}`].add = { request: true };
    document.querySelector(`.add-${financialType}-modal-form`).reset();
    document.querySelector(`.currentFutureFixed${capitalizeFirstLetter(financialType)}`).disabled = false;
    document.querySelector(`.currentPastFixed${capitalizeFirstLetter(financialType)}`).disabled = false;
    document.querySelector(`.add-${financialType}`).setAttribute('data-dismiss', 'modal');
}

const registerTransactions = async (apiUrl, financialType, selectInputs, monthsToRegister) => {
    const dateReplace = selectInputs.dueDate.replace(/-/g, '$').split('$')

    for (const month of monthsToRegister) {
        const dueDate = new Date(dateReplace[0], getMonthIndex(month), dateReplace[2]);
        const paylod = createPayload(financialType, selectInputs, month, dueDate);

        try {
            await window.registerItem(apiUrl, paylod);
        } catch (error) {
            console.log(error)
        }

    }

}

const getMonthIndex = (month) => {
    const monthsInPortuguese = [
        'janeiro',
        'fevereiro',
        'março',
        'abril',
        'maio',
        'junho',
        'julho',
        'agosto',
        'setembro',
        'outubro',
        'novembro',
        'dezembro'
    ];

    return monthsInPortuguese.indexOf(month.toLowerCase())
}

const createPayload = (financialType, selectInputs, month, dueDate) => {
    const currentYear = getCurrentYear();

    const payload = {
        user: {
            title: selectInputs.user,
            month: {
                title: capitalizeFirstLetter(month),
                year: currentYear,
                listMonth: {
                    [financialType]: selectInputs[financialType],
                    value: selectInputs.value,
                    dueDate,
                    paymentMethod: selectInputs.paymentMethod
                }
            }
        }
    }

    if (financialType === 'expense') {
        payload.user.month.listMonth.category = selectInputs.category
    }

    return payload
}

const currentMonthTransactionRegistration = async (financialType) => {
    const apiURL = `${window.apiURL}/auth/${financialType}s`;
    const buttonAddTransaction = document.querySelector(`.add-${financialType}`);
    buttonAddTransaction.setAttribute('data-dismis', 'modal');

    const payload = generateMonthlyDataPayload(financialType);

    try {
        await window.registerItem(apiURL, payload)
            .then(() => {
                window[`add${capitalizeFirstLetter(financialType)}`].add = { request: true }
            })
            document.querySelector(`.add-${financialType}-modal-form`).reset();
    } catch (error) {
        console.log(error)
    }

}


const generateMonthlyDataPayload = (financialType) => {
    const selectInputs = selectInputsDom(financialType);
    const dueDate = document.querySelector(`.dueDate${capitalizeFirstLetter(financialType)}`).value;
    const generateDateCall = generateDateForTransaction(dueDate);

    const monthSelected = generateDateCall.month;
    const currentYear = generateDateCall.year;

    const generatePortugueseDate = generatePortugueseDateFormatTransaction(dueDate);

    const payload = {
        user: {
            title: selectInputs.user,
            month: {
                title: monthSelected,
                year: currentYear,
                listMonth: {
                    [financialType]: selectInputs[financialType],
                    value: selectInputs.value,
                    dueDate: generatePortugueseDate,
                    paymentMethod: selectInputs.paymentMethod
                }
            }
        }
    }

    if (financialType === 'expense') {
        payload.user.month.listMonth.category = selectInputs.category;
    }

    return payload;

}

const generateDateForTransaction = (date) => {
    const dateReplace = date.replace(/-/g, '$').split('$');

    let fixedMonth = Number(dateReplace[1] - 1);
    let newDate = new Date(dateReplace[0], fixedMonth, dateReplace[2]);

    const monthDateSelected = newDate.toLocaleDateString('pt-br', {
        month: 'long'
    })

    let formattedDateString = capitalizeFirstLetter(monthDateSelected)

    const year = newDate.getFullYear();

    return {
        month: formattedDateString,
        year: year
    }

}

const generatePortugueseDateFormatTransaction = (date) => {
    const dateReplace = date.replace(/-/g, '$').split('$');

    let fixedMonth = Number(dateReplace[1] - 1);
    let newDate = new Date(dateReplace[0], fixedMonth, dateReplace[2]);

    const monthDateSelected = newDate.toLocaleDateString('pt-br', {
        month: 'long'
    })

    let indexMonthCurrent = getMonthIndex(monthDateSelected);

    return new Date(dateReplace[0], indexMonthCurrent, dateReplace[2]);
}