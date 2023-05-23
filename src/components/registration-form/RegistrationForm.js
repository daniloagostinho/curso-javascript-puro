class RegistrationForm extends HTMLElement {
    constructor() {
        super();

        fetch('src/components/registration-form/RegistrationForm.html')
            .then(response => response.text())
            .then(text => this.innerHTML = text)
    }

}

if ('customElements' in window) {
    customElements.define('app-registration-form', RegistrationForm)
}
