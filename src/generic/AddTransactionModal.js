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
    } else if(financialType === 'expense') {
        transactionDetail.expense = expense;
        transactionDetail.catrgory = category
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
    const currentPastFixed = document.querySelector(`.currentPastFixed${capitalizeFirstLetter(financialType)}`).checked;
    const user = localStorage.getItem('user');


    const result = {
        [financialType] : transaction,
        value,
        dueDate, 
        currentFutureFixed,
        currentPastFixed,
        user
    }

    if (financialType === 'expense') {
        result.category = category;
    } else if (financialType === 'income') {
        result.paymentMethod = paymentMethod;
    }

    return result;
}