const createHTMLElement = (tag, className, innerHTML = '') => {
    const element = document.createElement(tag);
    if (className && typeof className === 'string') {
        element.classList.add(className)
    }

    element.innerHTML = innerHTML;
    return element;
}

const populateTransactionCards = (financialType, arr, arrFull) => {
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

    // if (currentExtractArr === lastExtractArr) return;

    const timeline = document.querySelector(`.my-timeline-${financialType}`);
    timeline.innerHTML = '';

    document.querySelector(`.my-timeline-${financialType}`).style.display = 'block';
    document.querySelector(`.no-result-${financialType}-extract`).style.display = 'none';
    document.querySelector(`.my-pagination-${financialType}-extract`).style.display = 'block';

    // const totalFinancialType = arrFull.reduce((accumulator, currentValue) => accumulator + currentValue.total, 0);
    // document.querySelector(`.${financialType}-balance`).innerHTML = `Saldo total: ${currencyValue(totalFinancialType)}`;

   arr.result.forEach(transactionType => {
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
            populateTransactionCards(financialType, value.data)
            target[property] = value;
        }
    })
}