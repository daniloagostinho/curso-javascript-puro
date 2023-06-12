class IncomeMonths extends HTMLElement {
    constructor() {
        super();

        fetch('src/components/dashboard/income-list/income-months/IncomeMonths.html')
            .then(response => response.text())
            .then(text => this.innerHTML = text)
    }

    connectedCallback() {
        setTimeout(() => {
            setImages('income');
            getCurrentDate('income');
        }, 100)
    }
}


if ('customElements' in window) {
    customElements.define('app-income-months', IncomeMonths)
}