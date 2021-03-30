let progressBar = document.getElementsByClassName('progress-bar');
let greenBar = 'bg-success'
let blueBar = 'bg-info';
let yellowBar = 'bg-warning';
let redBar = 'bg-danger';
let value;
let inputId = document.getElementById('inputId');
let formContenedor = document.getElementsByClassName('form-contenedor');
let tableBody = document.getElementById('table-body');
let contactId;
let checkBoxAll = document.getElementById('allCheck');
let checkBoxOne = document.getElementsByClassName('form-check-input');
let rows = document.getElementsByClassName('rows');
let arrayId = [];
let uniqueArray;
let contador = document.getElementById('contact-count');
let countContainer = document.getElementsByClassName('contador');
let btnContainer = document.getElementsByClassName('btn-cont');
let btnDeleteAll = document.getElementById('delete-btn-group');
let inputNameDirection = document.getElementById('name-direction');
let inputEmailDirection = document.getElementById('email-direction');
let inputPositionDirection = document.getElementById('position-direction');
let inputCompanyDirection = document.getElementById('company-direction');
let inputInterestDirection = document.getElementById('interest-direction');
let inputCountryDirection = document.getElementById('country-direction');
let btnOrderName = document.getElementById('order-name');
let btnOrderEmail = document.getElementById('order-email');
let btnOrderPosition = document.getElementById('order-position');
let btnOrderCompany = document.getElementById('order-company');
let btnOrderInterest = document.getElementById('order-interest');
let btnOrderCountry = document.getElementById('order-country');


document.querySelectorAll('.form-check-input').forEach(item => {
    item.addEventListener('click', e => {
        if (e.target.id != 'allCheck') {
            e.target.checked = false;
            let value = e.target.value;
            checkBoxValues(value);
        }
    })
})

if (progressBar.length > 0) {
    for (let bar of progressBar) {
        value = bar.getAttribute('aria-valuenow');
        bar.style.width = value + "%";
        if (value <= 25) {
            bar.classList.add(greenBar);
        } else if (value > 25 && value <= 50) {
            bar.classList.add(blueBar);
        } else if (value > 50 && value <= 75) {
            bar.classList.add(yellowBar);
        } else if (value > 75) {
            bar.classList.add(redBar);
        }
    }
}

function editContact(id) {
    contactId = id;
    inputId.value = contactId;
    formContenedor[0].classList.add('active');
}

function deleteContact(id) {
    contactId = id;
    let urlencoded = new URLSearchParams();
    urlencoded.append('id', contactId);
    requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        body: urlencoded
    };
    fetch("http://localhost:3000/contactos", requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result);
            conctactId = 0;
            location.reload();
        })
        .catch(err => {
            console.log(err);
        })
}

if (tableBody != null) {
    tableBody.addEventListener('click', (e) => {
        let valueId = e.target.title;
        checkBoxValues(valueId);
    })
}

function checkBoxValues(value) {
    let valueId = value;
    for (let i = 0; i < checkBoxOne.length; i++) {
        if (valueId == checkBoxOne[i].value) {
            if (!checkBoxOne[i].checked) {
                checkBoxOne[i].checked = true;
                arrayId.push(valueId);
                uniqueArray = arrayId.filter((item, index) => {
                    return arrayId.indexOf(item) === index;
                });
                arrayId = uniqueArray;
                checkBoxAll.value = arrayId;
                rows[i].classList.add('table-primary');
            } else {
                checkBoxOne[i].checked = false;
                rows[i].classList.remove('table-primary');
                for (let i = 0; i < arrayId.length; i++) {
                    if (arrayId[i] == valueId) {
                        arrayId.splice(i, 1);
                        checkBoxAll.value = arrayId;
                    }
                }
            }
        }
    }
    checkStatusAll();
}

function checkStatusAll() {
    if ((arrayId.length + 1) < checkBoxOne.length && arrayId.length > 0) {
        checkBoxAll.indeterminate = true;
        countContainer[0].classList.add('active-count');
        btnContainer[0].classList.add('active-count');

    } else if (checkBoxOne.length == (arrayId.length + 1)) {
        checkBoxAll.indeterminate = false;
        checkBoxAll.checked = true;
    } else if (arrayId.length == 0) {
        checkBoxAll.indeterminate = false;
        checkBoxAll.checked = false;
        countContainer[0].classList.remove('active-count');
        btnContainer[0].classList.remove('active-count');
    }
    contador.innerHTML = `Contactos: ${arrayId.length}`;
}
if (checkBoxAll != null) {
    checkBoxAll.addEventListener('click', () => {
        arrayId = [];
        if (checkBoxAll.checked) {
            for (let i = 1; i < checkBoxOne.length; i++) {
                checkBoxOne[i].checked = true;
                countContainer[0].classList.add('active-count');
                btnContainer[0].classList.add('active-count');
                let uniqueValue = checkBoxOne[i].value;
                arrayId.push(uniqueValue);
            }
            for (let i = 0; i < rows.length; i++) {
                rows[i].classList.add('table-primary');
            }
        } else {
            for (let i = 1; i < checkBoxOne.length; i++) {
                checkBoxOne[i].checked = false;
                countContainer[0].classList.remove('active-count');
                btnContainer[0].classList.remove('active-count');
                arrayId = [];
            }
            for (let i = 0; i < rows.length; i++) {
                rows[i].classList.remove('table-primary');
            }
        }
        checkBoxAll.value = arrayId;
        contador.innerHTML = `Contactos: ${arrayId.length}`;
    })
}

if (btnDeleteAll != null) {
    btnDeleteAll.addEventListener('click', () => {
        let valueIds = checkBoxAll.value;
        let ids = valueIds.split(',');
        console.log(ids);
        let urlencoded = new URLSearchParams();
        urlencoded.append('ids', ids);
        requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            body: urlencoded
        };
        fetch("http://localhost:3000/delete-contactos", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                location.reload();
            })
            .catch(err => {
                console.log(err);
            })
    })
}

if (btnOrderName != null) {
    let order = localStorage.getItem('order-name');
    if (order == null || order == 'DESC') {
        localStorage.setItem('order-name', 'ASC');
    } else {
        localStorage.setItem('order-name', 'DESC');
    }
    btnOrderName.addEventListener('click', () => {
        order = localStorage.getItem('order-name');
        inputNameDirection.value = order;
    })
}

if (btnOrderEmail != null) {
    let order = localStorage.getItem('order-email');
    if (order == null || order == 'DESC') {
        localStorage.setItem('order-email', 'ASC');
    } else {
        localStorage.setItem('order-email', 'DESC');
    }
    btnOrderEmail.addEventListener('click', () => {
        order = localStorage.getItem('order-email');
        inputEmailDirection.value = order;
    })
}

if (btnOrderPosition != null) {
    let order = localStorage.getItem('order-position');
    if (order == null || order == 'DESC') {
        localStorage.setItem('order-position', 'ASC');
    } else {
        localStorage.setItem('order-position', 'DESC');
    }
    btnOrderPosition.addEventListener('click', () => {
        order = localStorage.getItem('order-position');
        inputPositionDirection.value = order;
    })
}

if (btnOrderCompany != null) {
    let order = localStorage.getItem('order-company');
    if (order == null || order == 'DESC') {
        localStorage.setItem('order-company', 'ASC');
    } else {
        localStorage.setItem('order-company', 'DESC');
    }
    btnOrderCompany.addEventListener('click', () => {
        order = localStorage.getItem('order-company');
        inputCompanyDirection.value = order;
    })
}

if (btnOrderInterest != null) {
    let order = localStorage.getItem('order-interest');
    if (order == null || order == 'DESC') {
        localStorage.setItem('order-interest', 'ASC');
    } else {
        localStorage.setItem('order-interest', 'DESC');
    }
    btnOrderInterest.addEventListener('click', () => {
        order = localStorage.getItem('order-interest');
        inputInterestDirection.value = order;
    })
}

if (btnOrderCountry != null) {
    let order = localStorage.getItem('order-country');
    if (order == null || order == 'DESC') {
        localStorage.setItem('order-country', 'ASC');
    } else {
        localStorage.setItem('order-country', 'DESC');
    }
    btnOrderCountry.addEventListener('click', () => {
        order = localStorage.getItem('order-country');
        inputCountryDirection.value = order;
    })
}