const createHTMLElement = (tag, className, innerHTML = '') => {
    const element = document.createElement(tag);
    if (className && typeof className === 'string') {
        element.classList.add(className)
    }

    element.innerHTML = innerHTML;
    return element;
}

const populateTransactionCards = (financialType, arr, arrFull) => {
    console.log(arr)
    const options = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    };

    const labelCategory = 'Categoria';

    const dateLabel = financialType === 'income' ? 'Data de entrada' : 'Data de vencimento';

    // Verifica se array está vazio
    if (arr.lentgh === 0) {
        const timeline = document.querySelector(`.my-timeline-${financialType}`);
        timeline.innerHTML = '';

        document.querySelector(`.no-result-${financialType}-extract`).style.display = 'block';
        document.querySelector(`.my-pagination-${financialType}-extract`).style.display = 'none';
        document.querySelector(`.${financialType}-balance`).innerHTML = '';
        return;
    }

    const currentExtractArr = JSON.stringify(arr);
    
    if (currentExtractArr === window.lastExtractArr) return;
    window.lastExtractArr = currentExtractArr;

    const timeline = document.querySelector(`.my-timeline-${financialType}`);
    timeline.innerHTML = '';

    document.querySelector(`.my-timeline-${financialType}`).style.display = 'block';
    document.querySelector(`.no-result-${financialType}-extract`).style.display = 'none';
    document.querySelector(`.my-pagination-${financialType}-extract`).style.display = 'block';

    const totalFinancialType = arrFull.reduce((accumulator, currentValue) => accumulator + currentValue.total, 0);
    document.querySelector(`.${financialType}-balance`).innerHTML = `Saldo total: ${currencyValue(totalFinancialType)}`;

   arr.forEach(transactionType => {
        const timelineItem = createHTMLElement('div', 'timeline-item');
        timelineItem.appendChild(createHTMLElement('div', 'my-line'));
        timelineItem.appendChild(createHTMLElement('div', 'my-dot'));

        const timelineContent = createHTMLElement('div', 'my-timeline-content');
        timelineContent.appendChild(createHTMLElement('h5', '', capitalizeFirstLetter(transactionType.month)))
       

        transactionType.details.forEach(detail => {
            const detailDate = new Date(detail.dueDate);
            const category = financialType === 'income' ? detail.income : detail.expense;

            timelineContent.appendChild(createHTMLElement('p', '', `<strong>${dateLabel}:</strong> ${detailDate.toLocaleDateString('pt-BR', options)}`));
            timelineContent.appendChild(createHTMLElement('p', '', `<strong>${labelCategory}:</strong> ${category}`));
            timelineContent.appendChild(createHTMLElement('p', '', `<strong>Valor:</strong> ${currencyValue(detail.value)}`));


            console.log(timelineContent)
        })

        timelineItem.appendChild(timelineContent)
        timeline.appendChild(timelineItem)
   });
}

const checkClickedExtract = (financialType) => {
    window[`clicked${capitalizeFirstLetter(financialType)}Extract`] = new Proxy({}, {
        set: function (target, property, value) {
            buildPaginationExtract(financialType, value.data);
            target[property] = value;
        }
    })
}

const buildPaginationExtract = (financialType, arr) => {

    const reverseArray = arr.result.reverse();

    const pagination = document.querySelector(`.my-pagination-${financialType}-extract`);
    const paginationHTML = createPaginationExtract(financialType);

    pagination.innerHTML = paginationHTML;


    const pageLinks = pagination.querySelectorAll(`.my-pagination-${financialType}-extract .page-item`);
    const prevButton = document.querySelector(`.prev${financialType}Extract`)
    const nextButton = document.querySelector(`.next${financialType}Extract`)

    if (reverseArray.lentgh <= window.itemsPerPage) {
        nextButton.disabled = true;
    }

    populateTransactionCards(financialType, paginateItems(reverseArray, window.itemsPerPage, window.currentPage), reverseArray);

    for (const pageLink of pageLinks) {
        pageLink.addEventListener('click', event => {
            event.preventDefault();

            const clickedLink = event.target.closest('.page-link');

            if (clickedLink && clickedLink.textContent === 'Anterior') {
                window.currentPage--;
                nextButton.disabled = false;
            } else if (clickedLink && clickedLink.textContent === 'Próximo') {
                window.currentPage++;
                prevButton.disabled = false;
            }

            const nextPageData = paginateItems(reverseArray, window.itemsPerPage, window.currentPage);

            if (nextPageData.lentgh === 0) {
                nextButton.disabled = true;
                return;
            }

            populateTransactionCards(financialType, nextPageData, reverseArray);

            if (window.currentPage === 1) {
                prevButton.disabled = true;
            } else {
                prevButton.disabled = false;
            }

            if (window.currentPage === Math.ceil(arr.result.length / window.itemsPerPage)) {
                nextButton.disabled = true;
            } else {
                nextButton.disabled = false;
            }

        })
    }

    if (window.currentPage === 1) {
        prevButton.disabled = true;
    } else {
        prevButton.disabled = false;
    }
}

const createPaginationExtract = (financialType) => {
    let pagnationHTML = `
        <ul class="pagination">
            <li class="page-item">
                <button type="button" class="btn btn-outline-dark page-link prev${financialType}Extract">Anterior</button>
            </li>
            <li class="page-item">
                <button type="button" class="btn btn-outline-dark page-link next${financialType}Extract">Próximo</button>
            </li>
        </ul>
    `;
    return pagnationHTML;
}