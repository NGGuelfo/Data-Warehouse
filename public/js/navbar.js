//Declaración de las variables para controlar el menu
let navLink = document.getElementsByClassName('nav-link');
let linkLocation = window.location.pathname;
let linkSignUpActive = ['/', '/contactos', '/companies', '/usuarios', '/region_city'];
let itemContainer = document.getElementsByClassName('navbar-nav');
let admin = getCookie('isAdmin');

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


//Deshabilitar links

if (linkLocation == '/') {
    itemContainer[0].classList.add('flex-row-reverse');
    navLink[1].classList.add('d-none');
    navLink[2].classList.add('d-none');
    navLink[3].classList.add('d-none');
    navLink[4].classList.add('d-none');
} else {
    navLink[0].classList.add('d-none');
}

if (admin == "0") {
    navLink[3].classList.add('d-none');
}

//Funciones para controlar las clases activas del menu
for (let i = 0; i <= linkSignUpActive.length; i++) {
    if (linkSignUpActive[i] == linkLocation) {
        navLink[i].classList.add('active');
    }
}

if (linkLocation == '/orden-contact' || linkLocation == '/search-contacto') {
    navLink[0].classList.add('d-none');
    navLink[1].classList.add('active');
}