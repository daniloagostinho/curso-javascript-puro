class ExpenseMonths extends HTMLElement {
    constructor() {
        super();

        fetch('src/components/dashboard/expense-list/expense-months/ExpenseMonths.html')
            .then(response => response.text())
            .then(text => this.innerHTML = text)
    }

    connectedCallback() {
        setTimeout(() => {
            setImages('expense');
            getCurrentDate('expense');
        }, 1000)
    }
}

if ('customElements' in window) {
    customElements.define('app-expense-months', ExpenseMonths)
}