class IncomesExtract extends HTMLElement {
    constructor() {
        super();

        fetch('src/components/dashboard/incomes-extract/IncomesExtract.html')
            .then(response => response.text())
            .then(text => this.innerHTML = text)
    }

    connectedCallback() {
        setTimeout(() => {
        }, 3000)
    }
}

checkClickedExtract('income');

if ('customElements' in window) {
    customElements.define('app-incomes-extract', IncomesExtract)
}