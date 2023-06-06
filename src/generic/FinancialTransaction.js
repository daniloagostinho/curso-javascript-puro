const capitalizeFirstLetter = (string) => {
    return string.substring(0, 1).toUpperCase() + string.substring(1);
}

const openDialogAddFinancial = (financialType) => {
    const dialogSelector = (financialType === 'income') ? '.add-income-modal' : '.add-expense-modal';
    const dialog = document.querySelector(dialogSelector);
    dialog.click();
}

const selectDomElements = (financialType) => {
    const spinnerContainer = document.querySelector(`.spinner-${financialType}`);
    const searchBlock = document.querySelector(`.block-${financialType}-search`);
    const selectFilterCategory = document.getElementById(`select-category-${financialType}`);
    const selectFilterRange = document.getElementById(`select-range-${financialType}`);
    const pagination = document.querySelector(`nav.my-pagination-${financialType}`);
    const registerBlock = document.querySelector(`.block-register-${financialType}`);

    return {
        spinnerContainer,
        searchBlock,
        selectFilterCategory,
        selectFilterRange,
        pagination,
        registerBlock
    }
}

const fetchFinancialRecords = async (financialType) => {
    window.currentMonth = 'junho';
    const domElements = selectDomElements(financialType);
    domElements.spinnerContainer.style.display = 'block';

    const user = localStorage.getItem('user');
    const endpoint = financialType === 'income' ? '/list/incomes' : '/list/expenses';
    const selectedMonth = window.currentMonth;
    const currentYear = getCurrentYear();

    const isSelectedYear = window.yearSelected ? window.yearSelected : currentYear;

    window.fetchRecords(`${window.apiURL}${endpoint}`, capitalizeFirstLetter(selectedMonth), isSelectedYear, user)
        .then(response => response.json())
        .then(response => {
           
            let financialList = [];

            if (response.result.length === 0) {
                domElements.registerBlock.style.display = 'block';
            } else {
                response.result.forEach(record => {
                    financialList.push(record.user.month.listMonth)
                })
                
                domElements.searchBlock.style.display = 'block';
                domElements.selectFilterCategory.style.display = 'block';
                domElements.selectFilterRange.style.display = 'block';
                domElements.pagination.style.display = 'block';
                domElements.registerBlock.style.display = 'none';
                domElements.spinnerContainer.style.display = 'none';

                if (financialType === 'income') {
                    window.incomeArray = financialList;
                } else {
                    window.expenseArray = financialList;

                    financialList.forEach(item => {
                        item.expired = isExpenseExpired(item.dueDate)
                    })
                }

                // TODO
                // updateTotalBalance(financialList, financialType)
            }

            if (financialList.length === 0) {
                // clearTable(financialType);
            } else {
                initializeTable(financialType);
                buildPagination(financialType, financialList)
            }

        })

}


const initializeTable = (financialType) => {
    let table = document.querySelector(`.table-container-${financialType}s .table`);

    if (!table) {
        table = document.createElement('table');
        table.classList.add('table');
        document.querySelector(`.table-container-${financialType}s thead`);
    }

    let thead = document.querySelector(`.table-container-${financialType}s thead`);

    if (!thead) {
        thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        const titlesTable = financialType === 'income' ?
            ['Receita', 'Valor', 'Data de Entrada', 'Id', 'Método de pagamento', 'Ações'] :
            ['Despesa', 'Categoria', 'Valor', 'Data de Vencimento', 'Id',, 'Status', 'Ações']

        titlesTable.forEach(title => {
            const headerCell = document.createElement('th');
            headerCell.textContent = title;

            if (title === 'Id') {
                headerCell.classList.add('hide-id-column');
            }

            headerRow.appendChild(headerCell)
        })

        thead.appendChild(headerRow);
        table.appendChild(thead)

    }

    let tbody = document.querySelector(`.table-container-${financialType}s tbody`);

    if (!tbody) {
        tbody = document.createElement('tbody');

        table.appendChild(tbody);
    }

    // TODO
    // tbody.addEventListener('click', event => {
    //     if(event.target.tagName === 'IMG') {}
    // })

    document.querySelector(`.table-container-${financialType}s`).appendChild(table);
}

const buildPagination = (financialType, financialList) => {

}