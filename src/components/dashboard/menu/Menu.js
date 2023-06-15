class Menu extends HTMLElement {
    constructor() {
        super();

        fetch('src/components/dashboard/menu/Menu.html')
            .then(response => response.text())
            .then(text => this.innerHTML = text)
    }

    connectedCallback() {
        setTimeout(() => {
            getImageUser();
            messageWelcome();
        }, 1000)
    }
}

const getMessageByHour = (hour) => {
    if (hour <= 5) {
        return 'Boa madrugada'
    }

    if (hour < 12) {
        return 'Bom dia!';
    }

    if (hour < 18) {
        return 'Boa tarde!';
    }

    return 'Boa noite!'
}

const messageWelcome = () => {
    const messageContainer = document.querySelector('.message');

    const { name } = JSON.parse(localStorage.getItem('userInfo'));

    const currentHour = new Date().getHours();

    const greetingMessage = getMessageByHour(currentHour);

    const capitalizeUserName = capitalizeFirstLetter(name);

    messageContainer.innerHTML = `Olá <strong>${capitalizeUserName}</strong>, ${greetingMessage}`

}

const getImageUser = () => {
    const img = document.querySelector('.profile-img');

    const nameImage = JSON.parse(localStorage.getItem('userInfo'));

    window.downloadImage(`${window.apiURL}/download/image`, nameImage.image)
        .then(response => response.json())
        .then(response => {
            let url = 'data:image/jpg;base64, ' + response.image;
            img.src = url;
        })
}

const removeComponentsDashboard = () => {
    const selectorComponents = [
        '.total-income-component',
        '.total-expense-component',
        '.total-balance-component',
        '.incomes-component',
        '.expenses-component'
    ];


    selectorComponents.forEach(component => {
        const element = document.querySelector(component);

        if (element) {
            element.style.display = 'none';
        }
    })
}

const financialDataExtract = (financialType) => {
    if (financialType === 'income') {
        removeComponentsDashboard();
    } else {
        removeComponentsDashboard();
    }

    document.querySelector(`.${financialType}s-extract`).style.display = 'block';

    const url = financialType === 'income' ? `${window.apiURL}/incomes/extract` : `${window.apiURL}/expenses/extract`;

    
}

if ('customElements' in window) {
    customElements.define('app-menu', Menu)
}