class IncomeExpenseChart extends HTMLElement {
    constructor() {
        super();

        fetch('src/components/dashboard/income-expense-chart/IncomeExpenseChart.html')
            .then(response => response.text())
            .then(text => this.innerHTML = text)
    }

    connectedCallback() {
        setTimeout(() => {
            renderExpenseIncomeChart();
        }, 3000)
    }
}

let expenseIncomePieChart;

const renderExpenseIncomeChart = () => {
    const ctx = document.getElementById('expenseIncomeChart').getContext('2d');
    const noDateMessage = document.getElementById('noDataMessage');

    const data = {
        labels: ['Receita', 'Despesas'],
        datasets: [{
            data: [window.totalIncomesVariable, window.totalExpensesVariable],
            backgroundColor: ['#4caf50', '#f44336'],
            borderColor: ['#4caf50', '#f44336'],
            borderWidth: 0
        }]
    }

    console.log(data)
}

if ('customElements' in window) {
    customElements.define('app-income-expense-chart', IncomeExpenseChart)
}