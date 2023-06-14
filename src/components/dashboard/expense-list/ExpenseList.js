class ExpenseList extends HTMLElement {
    constructor() {
        super();

        fetch('src/components/dashboard/expense-list/ExpenseList.html')
            .then(response => response.text())
            .then(text => this.innerHTML = text)
    }

    connectedCallback() {
        setTimeout(() => {
            fetchFinancialRecords('expense');
            createFilterSelectElement(window.optionsFilterExpense, 'select-category-expense', 'expense', 'category');
            createFilterSelectElement(window.optionsFilterRange, 'select-range-expense', 'expense', 'range');
        }, 1000)
    }
}

createCheckAddFinancial('expense');

if ('customElements' in window) {
    customElements.define('app-expense-list', ExpenseList)
}