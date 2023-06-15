class IncomesExtract extends HTMLElement {
    constructor() {
        super();

        fetch('src/components/dashboard/incomes-extract/IncomesExtract.html')
            .then(response => response.text())
            .then(text => this.innerHTML = text)
    }

    connectedCallback() {
        setTimeout(() => {
        }, 3000)
    }
}

checkClickedExtract('income');

const filterIncomes = (event) => {
    event.preventDefault();

    const user = localStorage.getItem('user');
    const startDate = document.getElementById('startDateIncome').value;
    const endDate = document.getElementById('endDateIncome').value;

    financialDataByDateRange(user, startDate, endDate, 'income');
}

if ('customElements' in window) {
    customElements.define('app-incomes-extract', IncomesExtract)
}