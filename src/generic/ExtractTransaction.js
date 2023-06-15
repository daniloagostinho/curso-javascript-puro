const createHTMLElement = (tag, className, innerHTML = '') => {
    const element = document.createElement(tag);
    if (className && typeof className === 'string') {
        element.classList.add(className)
    }

    element.innerHTML = innerHTML;
    return element;
}

