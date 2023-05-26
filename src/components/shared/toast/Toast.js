class Toast extends HTMLElement {
    constructor() {
        super();

        fetch('src/components/shared/toast/Toast.html')
            .then(response => response.text())
            .then(text => this.innerHTML = text)
    }
}

if ('customElements' in window) {
    customElements.define('app-toast', Toast)
}