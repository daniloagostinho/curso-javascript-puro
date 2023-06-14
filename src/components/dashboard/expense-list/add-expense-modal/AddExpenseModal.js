class AddExpenseModal extends HTMLElement {
    constructor() {
        super();

        fetch('src/components/dashboard/expense-list/add-expense-modal/AddExpenseModal.html')
            .then(response => response.text())
            .then(text => this.innerHTML = text)
    }

    connectedCallback() {
        setTimeout(() => {
            createSelectElement('expense', 'add', '.select-container-expense', 'Categoria', window.typeExpense, 11);
            toggleCheckboxes('.currentFutureFixedExpense', '.currentPastFixedExpense');
        }, 1000)
    }
}

const handleAddExpense = (event) => {
    event.preventDefault();

    const expenseDetails = createObjtransactionDetails('expense');
    const buttonAddExpense = document.querySelector('.add-expense');

    if (!verifyFieldFillTransaction('expense', expenseDetails)) {
        buttonAddExpense.removeAttribute('data-dismiss');
        alert('Preencha os campos vazios!');
        return;
    }

    buttonAddExpense.setAttribute('data-dismiss', 'modal');
    expenseDetails.currentFutureFixed || expenseDetails.currentPastFixed ? registerFixedTransaction('expense') : currentMonthTransactionRegistration('expense');

}

if ('customElements' in window) {
    customElements.define('app-add-expense-modal', AddExpenseModal)
}
