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
        }, 1000);
    }
}

if ('customElements' in window) {
    customElements.define('app-income-list', IncomeList)
}