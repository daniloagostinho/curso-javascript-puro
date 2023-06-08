class UpdateIncomeModal extends HTMLElement {
    constructor() {
        super();

        fetch('src/components/dashboard/income-list/update-income-modal/UpdateIncomeModal.html')
            .then(response => response.text())
            .then(text => this.innerHTML = text)
    }

    connectedCallback() {
    }
}

if ('customElements' in window) {
    customElements.define('app-update-income-modal', UpdateIncomeModal)
}