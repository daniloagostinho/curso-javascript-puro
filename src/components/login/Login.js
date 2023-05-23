class Login extends HTMLElement {
    constructor() {
        super();

        fetch('src/components/login/Login.html')
            .then(response => response.text())
            .then(text => this.innerHTML = text)
    }

    connnectedCallback() {
        console.log('Componenente renderizado na DOM')
    }
}

if ('customElements' in window) {
    customElements.define('app-login', Login)
}