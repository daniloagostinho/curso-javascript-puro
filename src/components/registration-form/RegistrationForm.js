class RegistrationForm extends HTMLElement {
    constructor() {
        super();

        fetch('src/components/registration-form/RegistrationForm.html')
            .then(response => response.text())
            .then(text => this.innerHTML = text)
    }

    connectedCallback() {
        setTimeout(() => {
            setAvatar();
        }, 1000)
    }
}

const setAvatar = () => {
    const imgAvatar = document.querySelector('.avatar');
    if(imgAvatar) {
        imgAvatar.src = 'src/assets/images/avatar.png'
    }
}



if ('customElements' in window) {
    customElements.define('app-registration-form', RegistrationForm)
}
