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
            ['Despesa', 'Categoria', 'Valor', 'Data de Vencimento', 'Id', , 'Status', 'Ações']

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
    const pagination = document.querySelector(`.my-pagination-${financialType}`);

    const paginationHTML = createPagination(financialType);

    pagination.innerHTML = paginationHTML;

   const pageLinks = pagination.querySelectorAll('.page-item');

   const prevItems = document.querySelector(`.prev${capitalizeFirstLetter(financialType)}`);
   const nexItems = document.querySelector(`.next${capitalizeFirstLetter(financialType)}`);

   if (financialList.length <= window.itemsPerPage || financialList.length === 1) {
        nexItems.disabled = true;
   }

    updateTableRows(financialType, financialList);
}


const currencyValue = (value) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value)
}

const updateTableRows = (financialType, financialList) => {
    let tableContainerClass = financialType === 'income' ? '.table-container-incomes' : '.table-container-expenses';

    let tbody = document.querySelector(`${tableContainerClass} tbody`);
    tbody.innerHTML = '';

    const options = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    }

    console.log(financialList)

    financialList.forEach(item => {
        const tr = document.createElement('tr');
        const expiredClass = item.expired ? 'expired' : 'not-expired';

        if (financialType === 'income') {
            tr.innerHTML = `
                <td>${item.income}</td>
                <td>${currencyValue(item.value)}</td>
                <td>${new Date(item.dueDate).toLocaleDateString('pt-BR', options)}</td>
                <td>${item.paymentMethod}</td>
                <td class="hide-id-column">${item._id}</td>
                <td>
                    <img class="image" src="${item.actions[0]}" />
                    <img class="image" src="${item.actions[1]}" />
                </td>
            `;

            console.log(tr)
        } else {
            tr.innerHTML = `
                <td>${item.expense}</td>
                <td>${item.category}</td>
                <td>${currencyValue(item.value)}</td>
                <td>${new Date(item.dueDate).toLocaleDateString('pt-BR', options)}</td>
                <td class="hide-id-column">${item._id}</td>
                <td>
                    <img class="image" src="${item.actions[0]}" />
                    <img class="image" src="${item.actions[1]}" />
                </td>
            `;
        }

        tbody.appendChild(tr)
    })

}

const createPagination = (financialType) => {
    const prevButtonClass = `prev${capitalizeFirstLetter(financialType)}`;
    const nextButtonClass = `next${capitalizeFirstLetter(financialType)}`;

    const paginationHTML = `
        <ul class="pagination justify-content-center">
            <li class="page-item">
                <button type="button" class="btn btn-outline-dark page-link ${prevButtonClass}" disabled>
                    Anterior
                </button>
            </li>
            <li class="page-item">
                <button type="button" class="btn btn-outline-dark page-link ${nextButtonClass}">
                    Próximo
                </button>
            </li>
        </ul>
    `;

    return paginationHTML;

}