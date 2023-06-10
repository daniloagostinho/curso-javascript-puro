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
                    window.filteredFincialArray = financialList;
                } else {
                    window.expenseArray = financialList;
                    window.filteredFincialArray = financialList;

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
                buildPagination(financialType)
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

    tbody.addEventListener('click', event => {

        if(event.target.tagName === 'IMG') {
            const tr = event.target.closest('tr');
            console.log(tr.children)
            
            const urlImage = event.target.getAttribute('src');

            let item;

            if (financialType === 'income') {
                item = {
                    income: tr.children[0].textContent,
                    value: tr.children[1].textContent,
                    dueDate: tr.children[2].textContent,
                    paymentMethod: tr.children[3].textContent,
                    id: tr.children[4].textContent
                }

            } else {
                item = {
                    expense: tr.children[0].textContent,
                    category: tr.children[1].textContent,
                    value: tr.children[2].textContent,
                    dueDate: tr.children[3].textContent,
                    id: tr.children[4].textContent
                }
            }

            captureClickedActionForType(urlImage, item, financialType);
        }
    })

    document.querySelector(`.table-container-${financialType}s`).appendChild(table);
}

const buildPagination = (financialType) => {
    const pagination = document.querySelector(`.my-pagination-${financialType}`);

    const paginationHTML = createPagination(financialType);

    pagination.innerHTML = paginationHTML;

    const pageLinks = pagination.querySelectorAll('.page-item');

    const prevItems = document.querySelector(`.prev${capitalizeFirstLetter(financialType)}`);
    const nexItems = document.querySelector(`.next${capitalizeFirstLetter(financialType)}`);

    if (window.filteredFincialArray.length <= window.itemsPerPage || window.filteredFincialArray.length === 1) {
        nexItems.disabled = true;
    }

    updateTableRows(financialType, paginateItems(window.filteredFincialArray, window.itemsPerPage, window.currentPage));


    for (const pageLink of pageLinks) {
        pageLink.addEventListener('click', event => {
            event.preventDefault();

            const clickedLink = event.target.closest('.page-link');


            if (clickedLink && removeSpaces(clickedLink.textContent) === 'Anterior') {
                window.currentPage--;
                nexItems.disabled = false;
            } else if (clickedLink && removeSpaces(clickedLink.textContent) === 'Próximo') {
                window.currentPage++;
                prevItems.disabled = false;
            }

            const nextPageData = paginateItems(window.filteredFincialArray, window.itemsPerPage, window.currentPage);

            if (nextPageData.length === 0) {
                clickedLink.disabled = true;
                return;
            }

            updateTableRows(financialType, nextPageData)

            if (window.currentPage === 1) {
                prevItems.disabled = true;
            } else {
                prevItems.disabled = false;
            }

            if (window.currentPage === Math.ceil(window.filteredFincialArray.length / window.itemsPerPage)) {
                nexItems.disabled = true;
            } else {
                nexItems.disabled = false;
            }

        })
    }
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

const paginateItems = (financialList, itemsPerPage, currentPage) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return financialList.slice(startIndex, startIndex + itemsPerPage)
}

const removeSpaces = (value) => {
    return value.replace(/\s/g, '')
}

const createCheckAddFinancial = (financialType) => {
    window[`add${capitalizeFirstLetter(financialType)}`] = new Proxy({}, {
        set: function (target, property, value) {
            fetchFinancialRecords(financialType);

            target[property] = value;
        }
    })
}

const searchFinancialRecords = (event, financialType) => {
    const noResult = document.querySelector(`.no-result-${financialType}s`);
    const pagination = document.querySelector(`.my-pagination-${financialType}`);
    const searchTerm = event.target.value.toLowerCase();
    const tableHead = document.querySelector(`.table-container-${financialType}s .table thead`);


    let financialArray;

    if (financialType === 'income') {
        financialArray = window.incomeArray;
        window.filteredFincialArray = window.incomeArray;;
    } else {
        financialArray = window.expenseArray;
        window.filteredFincialArray = window.expenseArray;
    }

    window.filteredFincialArray = financialArray.filter(item => {
        const text = item[financialType].toLowerCase();
        return text.includes(searchTerm)
    })

    if (window.filteredFincialArray.length > 0) {
        noResult.style.display = 'none';
        pagination.style.display = 'block';
        tableHead.style.display = 'table-header-group';

        const paginateArray = paginateItems(window.filteredFincialArray, window.itemsPerPage, window.currentPage);
        updateTableRows(financialType, paginateArray);

        const nexItems = document.querySelector(`.next${capitalizeFirstLetter(financialType)}`);

        if (window.filteredFincialArray.length <= window.itemsPerPage * window.currentPage) {
            nexItems.disabled = true;
        } else {
            nexItems.disabled = false;
        }

    } else {
        noResult.style.display = 'block';
        tableHead.style.display = 'none';
        pagination.style.display = 'none';

        const tableBody = document.querySelector(`.table-container-${financialType}s .table tbody`);

        tableBody.innerHTML = '';
    }

}

const captureClickedActionForType = (urlImage, item, financialType) => {
    if (urlImage.includes('edit.png')) {
        const dialogUpdate = document.querySelector(`.update-${financialType}-modal`);
        dialogUpdate.click();
        window[`${financialType}Save`].add = item;
    } else {
        if (financialType === 'income') {
            removeFinancialRecord(item.id, 'income');
        } else {
            removeFinancialRecord(item.id, 'expense');
        }
    }
}

const createCheckRequestUpdateFinancial = (financialType) => {
    window[`updateRequest${capitalizeFirstLetter(financialType)}`] = new Proxy({}, {
        set: function (target, property, value) {
            fetchFinancialRecords(financialType);

            target[property] = value;
        }
    })
}

const removeFinancialRecord = (id, financialType) => {
    const url = `${window.apiURL}/delete/${financialType}/${id}`;
    window.deleteFinancialRecord(url)
        .then(() => {
            fetchFinancialRecords(financialType)
        })

}