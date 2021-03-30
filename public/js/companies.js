let btnActivateForm = document.getElementById('agregate-btn');
let overlayForm = document.getElementsByClassName('overlay-form');
let selectRegion = document.getElementById('select-region');
let selectCountry = document.getElementById('select-country');
let selectCity = document.getElementById('select-city');
let createCompanyBtn = document.getElementById('agregate_company_btn');
let mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
let inputName = document.getElementById('name');
let inputAdress = document.getElementById('adress');
let inputEmail = document.getElementById('email');
let inputPhone = document.getElementById('phone');
let formTitle = document.getElementById('form-title');

let regions;
let countries;
let cities;
let companyId = 0;
let statusForm;

let myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${token}`);
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
let urlencoded = new URLSearchParams();

let requestOptions = {
    method: 'GET',
    headers: myHeaders
};

fetch("http://localhost:3000/region", requestOptions)
    .then(response => response.json())
    .then(result => {
        regions = result.data;
        regions.sort(function (a, b) {
            let textA = a.name;
            let textB = b.name;
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
        for (value in regions) {
            let option = document.createElement('option');
            option.text = regions[value].name;
            option.value = regions[value].id;
            selectRegion.add(option);
        }
    })
    .catch(error => console.log('error', error));

btnActivateForm.addEventListener('click', () => {
    overlayForm[0].classList.add('active');
    formTitle.innerText = 'Agregar Companía';
    createCompanyBtn.innerText = 'Agregar Companía';
})

selectRegion.addEventListener('change', () => {
    selectCountry.removeAttribute('disabled');
    let regionId = selectRegion.value;
    urlencoded.append('regionId', regionId);
    requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded
    };

    fetch("http://localhost:3000/countries", requestOptions)
        .then(response => response.json())
        .then(result => {
            countries = result.data;
            countries.sort(function (a, b) {
                let textA = a.name;
                let textB = b.name;
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            });
            for (value in countries) {
                let option = document.createElement('option');
                option.text = countries[value].name;
                option.value = countries[value].id;
                selectCountry.add(option);
            }
        })
        .catch(error => console.log('error', error));
})

selectCountry.addEventListener('change', () => {
    selectCity.removeAttribute('disabled');
    let countryId = selectCountry.value;
    urlencoded = new URLSearchParams();
    urlencoded.append('countryId', countryId);
    requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded
    };

    fetch("http://localhost:3000/cities", requestOptions)
        .then(response => response.json())
        .then(result => {
            cities = result.data;
            cities.sort(function (a, b) {
                let textA = a.name;
                let textB = b.name;
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            });
            for (value in cities) {
                let option = document.createElement('option');
                option.text = cities[value].name;
                option.value = cities[value].id;
                selectCity.add(option);
            }
        })
        .catch(error => console.log('error', error));
})

inputName.addEventListener('keyup', () => {
    if (inputName.value.length == 0) {
        inputName.classList.add('is-invalid');
        statusForm = false;
    } else {
        inputName.classList.remove('is-invalid');
        inputName.classList.add('is-valid');
        statusForm = true;
    }
})

inputAdress.addEventListener('keyup', () => {
    if (inputAdress.value.length == 0) {
        inputAdress.classList.add('is-invalid');
        statusForm = false;
    } else {
        inputAdress.classList.remove('is-invalid');
        inputAdress.classList.add('is-valid');
        statusForm = true;
    }
})

inputEmail.addEventListener('keyup', () => {
    if (!inputEmail.value.match(mailFormat)) {
        inputEmail.classList.add('is-invalid');
        statusForm = false;
    } else {
        inputEmail.classList.remove('is-invalid');
        inputEmail.classList.add('is-valid');
        statusForm = true;
    }
})

inputPhone.addEventListener('keyup', () => {
    if (inputPhone.value.length == 0) {
        inputPhone.classList.add('is-invalid');
        statusForm = false;
    } else {
        inputPhone.classList.remove('is-invalid');
        inputPhone.classList.add('is-valid');
        statusForm = true;
    }
})

createCompanyBtn.addEventListener('click', () => {
    if (statusForm == true) {
        let urlencoded = new URLSearchParams();
        urlencoded.append('name', inputName.value);
        urlencoded.append('adress', inputAdress.value);
        urlencoded.append('phone', inputPhone.value);
        urlencoded.append('email', inputEmail.value);
        urlencoded.append('cityId', selectCity.value);
        if (companyId > 0) {
            urlencoded.append('id', companyId);
            requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: urlencoded
            };
        } else {
            requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: urlencoded
            };
        }
        fetch("http://localhost:3000/companies", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                companyId = 0;
            })
            .catch(err => {
                console.log(err);
            })
    }
})

function editCompany(id) {
    companyId = id;
    overlayForm[0].classList.add('active');
    formTitle.innerText = 'Editar Companía';
    createCompanyBtn.innerText = 'Editar Companía';
}

function deleteCompany(id) {
    companyId = id;
    let urlencoded = new URLSearchParams();
    urlencoded.append('id', companyId);
    requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        body: urlencoded
    };
    fetch("http://localhost:3000/companies", requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result);
            companyId = 0;
            location.reload();
        })
        .catch(err => {
            console.log(err);
        })
}