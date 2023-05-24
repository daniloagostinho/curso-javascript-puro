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
            formValidationRegistration();
        }, 1000)
    }
}

let uploadedAvatar;

const setAvatar = () => {
    const imgAvatar = document.querySelector('.avatar');
    if (imgAvatar) {
        imgAvatar.src = 'src/assets/images/avatar.png'
    }
}

const uploadAvatar = (event) => {
    if (event.target.files && event.target.files.length > 0) {
        const file = event.target.files[0];

        const reader = new FileReader();

        reader.onload = () => (document.querySelector('.avatar').src = reader.result)

        reader.readAsDataURL(file);

        uploadedAvatar = file;
    }
}

const validateRegistrationName = (name) => {
    const regex = /^[a-zA-ZÁ-ÿ\s]+$/;
    return regex.test(name);
}

const formValidationRegistration = () => {
    const button = document.querySelector('.btn-registration');
    const nameInput = document.querySelector('.nameRegistrationInput');
    const nameError = document.getElementById('nameRegistrationError');

    const validationDelay = 1000;
    
    if(nameInput) {
        addInputValidationEventWithDelay(nameInput, validateRegistrationName, nameError, button, validationDelay)
    }

}

if ('customElements' in window) {
    customElements.define('app-registration-form', RegistrationForm)
}
