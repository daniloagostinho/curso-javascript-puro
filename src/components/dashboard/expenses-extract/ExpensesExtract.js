class ExpensesExtract extends HTMLElement {
    constructor() {
        super();

        fetch('src/components/dashboard/expenses-extract/ExpensesExtract.html')
            .then(response => response.text())
            .then(text => this.innerHTML = text)
    }

    connectedCallback() {
        setTimeout(() => {
        }, 3000)
    }
}

checkClickedExtract('expense');

const filterExpenses = (event) => {
    event.preventDefault();

    const user = localStorage.getItem('user');
    const startDate = document.getElementById('startDateExpense').value;
    const endDate = document.getElementById('endDateExpense').value;

    financialDataByDateRange(user, startDate, endDate, 'expense');
}

if ('customElements' in window) {
    customElements.define('app-expenses-extract', ExpensesExtract)
}