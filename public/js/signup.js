//Declaracion de variables para el formulario de creación de usuarios
let nombre = document.getElementById('validationServer01');
let apellido = document.getElementById('validationServer02');
let email = document.getElementById('inputEmail3');
let perfil = document.getElementById('customSwitch2');
let passOne = document.getElementById('inputPassword6');
let passTwo = document.getElementById('inputPassword67');
let mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
let SignUpData = {};
let overlaySignUp = document.getElementsByClassName('overlay-signup');
let msgTitleOk = document.getElementById('msg-title1');
let msgTitleError = document.getElementById('msg-title2');
let btnCreateUser = document.getElementsByClassName('btn-outline-secondary');
let formSignUpOverlay = document.getElementsByClassName('main-signup');
let formTitle = document.getElementById('form-title');
let userId;


btnCreateUser[0].addEventListener('click', (e) => {
    e.preventDefault();
    formTitle.innerText = 'Crear Usuario';
    overlaySignUpForm();
});

let statusForm;

let signUpBtn = document.getElementById('signup_btn');

nombre.addEventListener('keyup', () => {
    if (nombre.value.length == 0) {
        nombre.classList.add('is-invalid');
        statusForm = false;
    } else {
        nombre.classList.remove('is-invalid');
        nombre.classList.add('is-valid');
        statusForm = true;
    }
})

apellido.addEventListener('keyup', () => {
    if (apellido.value.length == 0) {
        apellido.classList.add('is-invalid');
        statusForm = false;
    } else {
        apellido.classList.remove('is-invalid');
        apellido.classList.add('is-valid');
        statusForm = true;
    }
})

email.addEventListener('keyup', () => {
    if (!email.value.match(mailFormat)) {
        email.classList.add('is-invalid');
        statusForm = false;
    } else {
        email.classList.remove('is-invalid');
        email.classList.add('is-valid');
        statusForm = true;
    }
})

passOne.addEventListener('keyup', () => {
    if (passOne.value.length <= 7) {
        passOne.classList.add('is-invalid');
        statusForm = false;
    } else {
        passOne.classList.remove('is-invalid');
        passOne.classList.add('is-valid');
        statusForm = true;
    }
})

passTwo.addEventListener('keyup', () => {
    if (passTwo.value.length <= 7 || passOne.value != passTwo.value) {
        passTwo.classList.add('is-invalid');
        statusForm = false;
    } else {
        passTwo.classList.remove('is-invalid');
        passTwo.classList.add('is-valid');
        statusForm = true;
    }
})

signUpBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let url;
    let urlencoded;

    if (perfil.checked == false) {
        perfil.value = 0;
    } else {
        perfil.value = 1;
    }
    if (statusForm == true) {
        url = "http://localhost:3000/usuario";
        urlencoded = new URLSearchParams();
        urlencoded.append("name", nombre.value);
        urlencoded.append("lastname", apellido.value);
        urlencoded.append("email", email.value);
        urlencoded.append("perfil", perfil.value);
        urlencoded.append("password", passTwo.value);
        if (userId > 0) {
            urlencoded.append("id", userId);
        }
    }

    let requestOptions;
    if (!userId) {
        requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded
        }
    } else {
        requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: urlencoded
        }
    }
    fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => {
            SignUpData = data;
            if (SignUpData.status == 400) {
                overlaySignUp[1].classList.add('active');
                msgTitleError.innerText = SignUpData.msg;
            } else {
                overlaySignUp[0].classList.add('active');
                msgTitleOk.innerText = SignUpData.msg;
            }
            setTimeout(overlaySignUpMsg, 4000);
            setTimeout(refreshWindow, 2000);
        })
        .catch(err => {
            console.log(err);
        })
});

function overlaySignUpMsg() {
    if (SignUpData.status == 400) {
        overlaySignUp[1].classList.remove('active');
    } else {
        overlaySignUp[0].classList.remove('active');
    }
}

function overlaySignUpForm() {
    formSignUpOverlay[0].classList.add('active');
}

function editUser(id) {
    formTitle.innerText = 'Editar Usuario';
    userId = id;
    overlaySignUpForm();
}

function deleteUser(id) {
    userId = id;
    let urlencoded = new URLSearchParams();
    urlencoded.append('id', userId);
    requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        body: urlencoded
    };
    fetch("http://localhost:3000/usuario", requestOptions)
        .then(response => response.json())
        .then(data => {
            SignUpData = data;
            if (SignUpData.status == 400) {
                overlaySignUp[1].classList.add('active');
                msgTitleError.innerText = SignUpData.msg;
            } else {
                overlaySignUp[0].classList.add('active');
                msgTitleOk.innerText = SignUpData.msg;
            }
            setTimeout(overlaySignUpMsg, 4000);
            setTimeout(refreshWindow, 2000);
        })
        .catch(err => {
            console.log(err);
        })
}

function refreshWindow() {
    location.reload();
}