window.gender = [
    {
        name: 'Feminimo'
    },
    {
        name: 'Masculino'
    },
    {
        name: 'Outro'
    }
];

window.typeIncome = [
    {
        name: 'Salário'
    },
    {
        name: 'Rendimentos autônomos'
    },
    {
        name: 'Rendimentos passivos'
    },
    {
        name: 'Bônus'
    },
    {
        name: 'Investimento',
    },
    {
        name: 'Empréstimo',
    },
    {
        name: 'Férias',
    },
    {
        name: '13 Sálario',
    },
    {
        name: 'PLR',
    },
    {
        name: 'Aposentaria',
    },
    {
        name: 'Aluguel',
    },
    {
        name: 'Outros',
    }
]

window.paymentMethod = [
    {
        name: 'Dinheiro'
    },
    {
        name: 'Cheque',
    },
    {
        name: 'Cartão de débito',
    },
    {
        name: 'Cartão de crédito',
    },
    {
        name: 'Pix',
    },
    {
        name: 'Transferência bancária',
    },
    {
        name: 'Ordens de pagamento',
    },
    {
        name: 'Boleto bancário ',
    },
    {
        name: 'Outros'
    }
]

window.months = [
    'janeiro',
    'fevereiro',
    'março',
    'abril',
    'maio',
    'junho',
    'julho',
    'agosto',
    'setembro',
    'outubro',
    'novembro',
    'dezembro'
]

window.apiURL = 'http://localhost:3000';
window.addIncome = {};
window.addExpense = {};
window.currentMonth;
window.incomeArray;
window.expenseArray;
window.itemsPerPage = 3;
window.currentPage = 1;
window.filteredFincialArray = [];
window.incomeSave = {};
window.incomeId;
window.typeIncomeSelected;
window.typeExpenseSelected;
window.updateRequestIncome = {};
window.arrowLeft = 'src/assets/images/arrow-left.png';
window.arrowRight = 'src/assets/images/arrow-right.png';
window.monthsDate;