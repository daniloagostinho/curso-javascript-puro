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

if ('customElements' in window) {
    customElements.define('app-add-expense-modal', AddExpenseModal)
}