class UpdateIncomeModal extends HTMLElement {
    constructor() {
        super();

        fetch('src/components/dashboard/income-list/update-income-modal/UpdateIncomeModal.html')
            .then(response => response.text())
            .then(text => this.innerHTML = text)
    }

    connectedCallback() {
        setTimeout(() => {
            createSelectElement('income', 'update', '.select-update-container-income', 'Receita', window.typeIncome, 12);
            createSelectElement('income', 'update-payment-method', '.select-container-payment-method-update', 'Método de pagamento', window.paymentMethod, 9);
        }, 1000);
    }
}

createCheckUpdate('income');

if ('customElements' in window) {
    customElements.define('app-update-income-modal', UpdateIncomeModal)
}