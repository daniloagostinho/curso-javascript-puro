class Login extends HTMLElement {
    constructor() {
        super();

        fetch('src/components/login/Login.html')
            .then(response => response.text())
            .then(text => this.innerHTML = text)
    }

    connectedCallback() {
        console.log('Componenente renderizado na DOM')
    }
}

const openRegistrationModal = () => {
    const dialog = document.querySelector('.dialog-registration-modal');
    dialog.click();
}

if ('customElements' in window) {
    customElements.define('app-login', Login)
}