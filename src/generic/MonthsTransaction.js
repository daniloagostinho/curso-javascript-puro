const getCurrentYear = () => {
    return new Date().getFullYear();
}

const setImages = (financialType) => {
    const prefix = financialType === 'income' ? 'income' : 'expense';
    const arrowLeft = document.querySelector(`img.${prefix}-arrow-left-img`);
    const arrowRight = document.querySelector(`img.${prefix}-arrow-right-img`);

    arrowLeft.src = window.arrowLeft;
    arrowRight.src = window.arrowRight;
}

const setDate = (financialType, date) => {
    let dateString = date.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
    let dateMonth = date.toLocaleDateString('pt-BR', { month: 'long' });
    let letterDateString = capitalizeFirstLetter(dateString);
    window.currentMonth = dateMonth;

    const selectedYear = date.getFullYear();
    let selectedMonth = date.getMonth() + 1;
    let day = date.getDate();
    selectedMonth = selectedMonth < 10 ? '0' + selectedMonth : selectedMonth;

    document.querySelector(`.dueDate${capitalizeFirstLetter(financialType)}`).value = `${selectedYear}-${selectedMonth}-${day}`
    const prefix = financialType === 'income' ? 'income' : 'expense';

    document.querySelector(`.text-month-${prefix}`).innerHTML = letterDateString;
    
    window.monthsDate = date;
}

const getCurrentDate = (financialType) => {
    const currentDate = new Date();
    setDate(financialType, currentDate)
}

const prev = (financialType) => {
    const monthsDate = window.monthsDate;

    const prevDate = new Date(monthsDate.getFullYear(), monthsDate.getMonth() -1, monthsDate.getDate());

    const yearSelected = prevDate.getFullYear();

    window.yearSelected = yearSelected;

    setDate(financialType, prevDate);

    fetchFinancialRecords('income');
}