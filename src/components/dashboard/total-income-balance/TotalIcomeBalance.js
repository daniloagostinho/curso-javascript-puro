class TotalIncomeBalance extends HTMLElement {
    constructor() {
        super();

        fetch('src/components/dashboard/total-income-balance/TotalIcomeBalance.html')
            .then(response => response.text())
            .then(text => this.innerHTML = text)
    }

    connectedCallback() {
        setTimeout(() => {
        }, 3000)
    }
}

checkTotalBalance('income');

if ('customElements' in window) {
    customElements.define('app-total-income-balance', TotalIncomeBalance)
}