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

    const options = {
        responsive: true,
        maintainAspectRatio: true,
        legend: {
            display: true,
            position: 'bottom'
        },
        labels: {
            fontSize: 50
        },
        tooltips: {
            callbacks: {
                label: function (tooltipItem, data) {
                    const value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
    
                    return currencyValue(value)
                }
            }
        }
    }

    if (window.totalIncomesVariable === 0 && window.totalExpensesVariable === 0) {
        if (expenseIncomePieChart) {
            expenseIncomePieChart.destroy();
            expenseIncomePieChart = null;
        }
        ctx.canvas.style.display = 'none';
        noDateMessage.style.display = 'block';
    } else {
        noDateMessage.style.display = 'none';
        ctx.canvas.style.display = 'block';

        if (expenseIncomePieChart) {
            expenseIncomePieChart.data.datasets[0].data = [window.totalIncomesVariable, window.totalExpensesVariable];
            expenseIncomePieChart.update();
        } else {
            expenseIncomePieChart = new Chart(ctx, {
                type: 'pie',
                data: data,
                options
            })
        }
    }
}

if ('customElements' in window) {
    customElements.define('app-income-expense-chart', IncomeExpenseChart)
}