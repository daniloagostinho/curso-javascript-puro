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
        }, 1000)
    }
}

const getImageUser = () => {
    const img = document.querySelector('.profile-img');

    const nameImage = JSON.parse(localStorage.getItem('userInfo'));

    window.downloadImage(`${window.apiURL}/download/image`, nameImage.image)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            let url = 'data:image/jpg;base64, ' + response.image;
            img.src = url;
        })


}

if ('customElements' in window) {
    customElements.define('app-menu', Menu)
}