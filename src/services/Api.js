window.registerUser = (url, user) => {
    const formData = new FormData();

    formData.append('name', user.name);
    formData.append('email', user.email);
    formData.append('gender', user.gender);
    formData.append('image', user.image);
    formData.append('password', user.password);
    formData.append('confirmPassword', user.confirmPassword);

    return fetch(url, {
        method: 'POST',
        body: formData
    })
};

window.login = (url, user) => {
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: { 'Content-type': 'application/json' }
    })
}

window.validateToken = (url, token) => {
    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
}

window.downloadImage = (url, param) => {
    return fetch(url, {
        method: 'GET',
        headers: {
            'imgName': param
        }
    })
}

window.registerItem = (url, data) => {
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json'
        }
    })
}

window.fetchRecords = (url, month, year, user) => {
    return fetch(url, {
        headers: {
            'month': month,
            'year': year,
            'user': user
        }
    })
}

window.updateRecords = (url, data) => {
    return fetch(url, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: { 'Content-type': 'application/json' }
    })
}

window.deleteFinancialRecord = (url) => {
    return fetch(url, {
        method: 'DELETE'
    })
}


window.getFinancialDataByDateRange = (url, user, startDate, endDate) => {
    let headers = {
        'user': user
    }

    if (startDate) {
        headers['startDate'] = startDate;
    }

    if (endDate) {
        headers['endDate'] = endDate;
    }

    return fetch(url, {
        headers
    })
}