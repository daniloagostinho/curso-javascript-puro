// Web componentes

class MeuComponente extends HTMLElement {
    constructor() {
        super();

        this.innerHTML = '<h1>Meu primeiro componente!</h1>'
    }

    // Método de Clico de vida
    connectedCallback() {
        console.log('Meu componente foi carregado!')
    }

    disconnectedCallback() {
        console.log('Fui destruindo!')
    }
}

const remove = () => {
    document.getElementById('meu-componente').remove();
}
customElements.define('meu-componenente', MeuComponente)