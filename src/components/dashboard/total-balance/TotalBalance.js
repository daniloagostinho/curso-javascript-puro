class TotalBalance extends HTMLElement {
    constructor() {
        super();

        fetch('src/components/dashboard/total-balance/TotalBalance.html')
            .then(response => response.text())
            .then(text => this.innerHTML = text)
    }

    connectedCallback() {
        setTimeout(() => {
        }, 3000)
    }
}

const expenseLessThanIncome = () => {
    return window.totalExpensesVariable < window.totalIncomesVariable;
}

const expenseGreaterThanIncome = () => {
    return window.totalExpensesVariable > window.totalIncomesVariable;
}

const expenseEqualIncome = () => {
    return window.totalExpensesVariable === window.totalIncomesVariable;
}

const totalZeroBalance = () => {
    return window.totalExpensesVariable === 0 &&  window.totalIncomesVariable === 0;
}

const sumBalanceTotal = () => {
    let totalBalanceCard = document.querySelector('.total-balance-card');
    let totalBalanceDisplay = document.querySelector('.total-balance');

    if (expenseLessThanIncome()) {
        totalBalanceDisplay.innerHTML = currencyValue(Math.abs(window.totalExpensesVariable - window.totalIncomesVariable));
        totalBalanceCard.classList.add('positiveBalance');
    } else if (expenseGreaterThanIncome()) {
        totalBalanceDisplay.innerHTML = currencyValue(-(window.totalExpensesVariable - window.totalIncomesVariable));
        totalBalanceCard.classList.remove('positiveBalance');
        totalBalanceCard.classList.add('negativeBalance');
    } else if (expenseEqualIncome()) {
        totalBalanceDisplay.innerHTML = currencyValue(0);
        totalBalanceCard.classList.remove('positiveBalance');
        totalBalanceCard.classList.remove('negativeBalance');
    } else if (totalZeroBalance()) {
        totalBalanceCard.classList.remove('positiveBalance');
        totalBalanceCard.classList.remove('negativeBalance');
    }

    renderExpenseIncomeChart();
}

if ('customElements' in window) {
    customElements.define('app-total-balance', TotalBalance)
}