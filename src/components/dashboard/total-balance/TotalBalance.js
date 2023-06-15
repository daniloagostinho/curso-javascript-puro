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
    return window.totalExpensesVariable > window.totalIncomesVariable;;
}

const expenseEqualIncome = () => {
    return window.totalExpensesVariable === window.totalIncomesVariable;
}

const totalZeroBalance = () => {
    return window.totalExpensesVariable === 0 &&  window.totalIncomesVariable === 0;
}

const sumBalanceTotal = () => {
    
}

if ('customElements' in window) {
    customElements.define('app-total-balance', TotalBalance)
}