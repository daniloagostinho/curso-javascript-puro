class LoginForm extends HTMLElement {
    constructor() {
        super();

        fetch('src/components/login-form/LoginForm.html')
            .then(response => response.text())
            .then(text => this.innerHTML = text)
    }

}

if ('customElements' in window) {
    customElements.define('app-login-form', LoginForm)
}
