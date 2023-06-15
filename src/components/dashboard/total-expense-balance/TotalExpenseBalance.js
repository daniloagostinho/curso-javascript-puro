class TotalExpenseBalance extends HTMLElement {
    constructor() {
        super();

        fetch('src/components/dashboard/total-expense-balance/TotalExpenseBalance.html')
            .then(response => response.text())
            .then(text => this.innerHTML = text)
    }

    connectedCallback() {
        setTimeout(() => {
        }, 3000)
    }
}

checkTotalBalance('expense');

if ('customElements' in window) {
    customElements.define('app-total-expense-balance', TotalExpenseBalance)
}