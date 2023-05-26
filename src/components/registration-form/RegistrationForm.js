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
            createSelectElement('user', 'registration', '.select-container-gender', 'Gênero', window.gender, 3);

        }, 1000)
    }
}

let uploadedAvatar;
let password;
let confirmPassword;

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

const validateRegistrationEmail = (email) => {
    const regex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    return regex.test(email);
}

const validateRegistrationPassword = (password) => {
    return password.length >= 4;
}

const enableButton = () => {
    const button = document.querySelector('.btn-registration');
    button.disabled = false;
}

const disableButton = () => {
    const button = document.querySelector('.btn-registration');
    button.disabled = true;
}

const hideErrorMessage = () => {
    const errorMessage = document.querySelector('.no-match-password');
    errorMessage.style.display = 'none';
    enableButton();
}

const showErrorMessage = () => {
    const errorMessage = document.querySelector('.no-match-password');
    errorMessage.style.display = 'block';
    disableButton();
}

const isPasswordMatch = () => {
    if (password && confirmPassword && password == confirmPassword) {
        hideErrorMessage();
        return true;
    }

    return false;
}

const configCloseModalRemove = () => {
    const btnCloseModal = document.querySelector('.btn-registration');
    btnCloseModal.removeAttribute('data-dismiss')
}

const verifyPasswordMisMatch = () => {
    if (password && confirmPassword && password !== confirmPassword) {
        showErrorMessage();
        configCloseModalRemove();
    }
}

const formValidationRegistration = () => {
    const button = document.querySelector('.btn-registration');
    const nameInput = document.querySelector('.nameRegistrationInput');
    const nameError = document.getElementById('nameRegistrationError');
    const emailInput = document.querySelector('.emailRegistrationInput');
    const emailError = document.getElementById('emailErrorRegistration');
    const passwordInput = document.querySelector('.passwordRegistrationInput');
    const passwordError = document.getElementById('passwordRegistrationError');
    const confirmPasswordInput = document.querySelector('.confirmPasswordRegistrationInput');

    const validationDelay = 1000;

    if (nameInput) {
        addInputValidationEventWithDelay(nameInput, validateRegistrationName, nameError, button, validationDelay)
    }

    if (emailInput) {
        addInputValidationEventWithDelay(emailInput, validateRegistrationEmail, emailError, button, validationDelay)
    }

    if (passwordInput) {
        addInputValidationEventWithDelay(passwordInput, validateRegistrationPassword, passwordError, button, validationDelay);
        passwordInput.addEventListener('input', event => {
            password = event.target.value;
            isPasswordMatch();
            verifyPasswordMisMatch();
        })
    }

    if (confirmPasswordInput) {
        confirmPasswordInput.addEventListener('input', event => {
            confirmPassword = event.target.value;
            isPasswordMatch();
            verifyPasswordMisMatch();
        })
    }
}

const extractInputValues = () => {
    const name = document.querySelector('.nameRegistrationInput').value;
    const email = document.querySelector('.emailRegistrationInput').value;
    const gender = document.querySelector('.user-registration-category').value;
    const image = uploadedAvatar;
    const password = document.querySelector('.passwordRegistrationInput').value;
    const confirmPassword = document.querySelector('.confirmPasswordRegistrationInput').value;

    return {
        name,
        email,
        gender,
        image,
        password,
        confirmPassword
    }
}

const emptyFieldsCheck = (name, email, gender, image, password, confirmPassword) =>
    name !== '' &&
    email !== '' &&
    gender !== '' &&
    image !== undefined &&
    password &&
    confirmPassword


const checkErrorType = (error) => {
    if (error == 'Error: Unprocessable Entity') {
        alert('Já existe uma conta com esse e-mail!')
    }
}

const initToast = () => {
    let toastEl = document.querySelector('.toast');
    let toast = new bootstrap.Toast(toastEl);

    toast.show();
}

const registerUser = async (payload) => {
    await window.registerUser(`${window.apiURL}/auth/register/user`, payload)
        .then(captureErrorRequest)
        .then(response => response.json())
        .then(response => {
            localStorage.setItem('userInfo', JSON.stringify(response.user));
            initToast();
        }).catch(checkErrorType)

}

const sendDataToBackend = () => {
    const extractValues = extractInputValues();
    const btnCloseModal = document.querySelector('.btn-registration');

    const payload = {
        name: extractValues.name,
        email: extractValues.email,
        gender: extractValues.gender,
        image: extractValues.image,
        password: extractValues.password,
        confirmPassword: extractValues.confirmPassword
    }

    if (!emptyFieldsCheck(extractValues.name, extractValues.email, extractValues.gender,
        extractValues.image, extractValues.password, extractValues.confirmPassword)) {
        btnCloseModal.removeAttribute('data-dismiss');
        alert('Por favor preencha os campos vazios!');
        return;
    }

    btnCloseModal.setAttribute('data-dismiss', 'modal');
    registerUser(payload);
}


if ('customElements' in window) {
    customElements.define('app-registration-form', RegistrationForm)
}
