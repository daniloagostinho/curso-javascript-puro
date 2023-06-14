class UpdateExpenseModal extends HTMLElement {
    constructor() {
        super();

        fetch('src/components/dashboard/expense-list/update-expense-modal/UpdateExpenseModal.html')
            .then(response => response.text())
            .then(text => this.innerHTML = text)
    }

    connectedCallback() {
        setTimeout(() => {
            createSelectElement('expense', 'update', '.select-update-container-expense', 'Categoria', window.typeExpense, 11);
        }, 1000)
    }
}

createCheckUpdate('expense');

if ('customElements' in window) {
    customElements.define('app-update-expense-modal', UpdateExpenseModal)
}