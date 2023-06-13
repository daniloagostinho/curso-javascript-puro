class IncomeList extends HTMLElement {
    constructor() {
        super();

        fetch('src/components/dashboard/income-list/IncomeList.html')
            .then(response => response.text())
            .then(text => this.innerHTML = text)
    }

    connectedCallback() {
        setTimeout(() => {
            fetchFinancialRecords('income');
            createFilterSelectElement(window.optionsFilterIncome, 'select-category-income', 'income', 'category');
            createFilterSelectElement(window.optionsFilterRange, 'select-range-income', 'income', 'range');
        }, 1000);
    }
}

createCheckAddFinancial('income');

if ('customElements' in window) {
    customElements.define('app-income-list', IncomeList)
}