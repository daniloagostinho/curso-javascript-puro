class ExpenseList extends HTMLElement {
    constructor() {
        super();

        fetch('src/components/dashboard/expense-list/ExpenseList.html')
            .then(response => response.text())
            .then(text => this.innerHTML = text)
    }

    connectedCallback() {
    }
}

if ('customElements' in window) {
    customElements.define('app-expense-list', ExpenseList)
}