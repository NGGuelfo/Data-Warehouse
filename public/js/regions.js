let myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${token}`);
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
let urlencoded = new URLSearchParams();

let data = {};

let msgPopUp = document.getElementById('msg-popup');
let msgTitle = document.getElementById('msg-check');
let overlayInputs = document.getElementsByClassName('overlay-input');
let agregarCountryBtn = document.getElementById('btn-create-country');
let editCountryBtn = document.getElementById('btn-edit-country');
let postNewCityBtn = document.getElementById('btn-create-city');
let editBtnCity = document.getElementById('btn-edit-city');


agregarCountryBtn.addEventListener('click', postCountry);
editCountryBtn.addEventListener('click', putEditCountry);
postNewCityBtn.addEventListener('click', postNewCity);
editBtnCity.addEventListener('click', putCity);



function createRegion() {
    let regionName = document.getElementById('region-name').value;
    if (regionName.length > 0) {
        urlencoded.append("regionName", `${regionName}`);

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded
        };

        fetch("http://localhost:3000/region", requestOptions)
            .then(response => response.json())
            .then(result => {
                data = result;
                if (data.status == 400) {
                    msgPopUp.classList.add('error');
                } else {
                    msgPopUp.classList.add('ok');
                }
                msgTitle.innerText = data.msg;
                setTimeout(overlayPopUpMsg, 3000);
            })
            .catch(error => console.log('error', error));
    }
}

function deleteCountry(){
    $('#jstree').on("changed.jstree", function (e, data) {
        searchId = data.selected[0].split(" ");
        let countryId = searchId[1];
        urlencoded.append("id", countryId);

        let requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            body: urlencoded
        };

        fetch("http://localhost:3000/country", requestOptions)
            .then(response => response.json())
            .then(result => {
                data = result;
                if (data.status == 400) {
                    msgPopUp.classList.add('error');
                } else {
                    msgPopUp.classList.add('ok');
                }
                msgTitle.innerText = data.msg;
                setTimeout(overlayPopUpMsg, 3000);
            })
            .catch(error => console.log('error', error));
    });
}

function editCountry() {
    overlayInputs[2].classList.add('edit-active');
    $('#jstree').on("changed.jstree", function (e, data) {
        searchId = data.selected[0].split(" ");
    });
}

function createCountry() {
    overlayInputs[0].classList.add('edit-active');
    $('#jstree').on("changed.jstree", function (e, data) {
        searchId = data.selected[0].split(" ");
    });
}

function overlayPopUpMsg() {
    if (data.status == 400) {
        msgPopUp.classList.remove('error');
    } else {
        msgPopUp.classList.remove('ok');
    }
    location.reload();
}

function postCountry() {
    let countryName = document.getElementById('post-country').value;
    let regionId = searchId[1];
    if (countryName.length > 0) {
        urlencoded.append("regionId", regionId);
        urlencoded.append("countryName", countryName);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("http://localhost:3000/country", requestOptions)
            .then(response => response.json())
            .then(result => {
                data = result;
                overlayInputs[0].classList.remove('edit-active');
                if (data.status == 400) {
                    msgPopUp.classList.add('error');
                } else {
                    msgPopUp.classList.add('ok');
                }
                msgTitle.innerText = data.msg;
                console.log(msgTitle.innerText);
                setTimeout(overlayPopUpMsg, 3000);

            })
            .catch(error => console.log('error', error));
    }
}

function putEditCountry() {
    let newCountryName = document.getElementById('put-edit-country').value;
    let countryId = searchId[1];
    if (newCountryName.length > 0) {
        urlencoded.append("id", countryId);
        urlencoded.append("name", newCountryName);

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("http://localhost:3000/country", requestOptions)
            .then(response => response.json())
            .then(result => {
                data = result;
                console.log(data);
                overlayInputs[2].classList.remove('edit-active');
                if (data.status == 400) {
                    msgPopUp.classList.add('error');
                } else {
                    msgPopUp.classList.add('ok');
                }
                msgTitle.innerText = data.msg;
                console.log(msgTitle.innerText);
                setTimeout(overlayPopUpMsg, 3000);

            })
            .catch(error => console.log('error', error));
    }
}

function createCity() {
    overlayInputs[1].classList.add('edit-active');
    $('#jstree').on("changed.jstree", function (e, data) {
        searchId = data.selected[0].split(" ");
    });
}

function editCity() {
    overlayInputs[3].classList.add('edit-active');
    $('#jstree').on("changed.jstree", function (e, data) {
        searchId = data.selected[0].split(" ");
    });
}

function postNewCity(){
    let cityName = document.getElementById('city-name').value;
    let countryId = searchId[1];
    if (cityName.length > 0) {
        urlencoded.append("cityName", cityName);
        urlencoded.append("countryId", countryId);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("http://localhost:3000/city", requestOptions)
            .then(response => response.json())
            .then(result => {
                data = result;
                console.log(data);
                overlayInputs[1].classList.remove('edit-active');
                if (data.status == 400) {
                    msgPopUp.classList.add('error');
                } else {
                    msgPopUp.classList.add('ok');
                }
                msgTitle.innerText = data.msg;
                console.log(msgTitle.innerText);
                setTimeout(overlayPopUpMsg, 3000);

            })
            .catch(error => console.log('error', error));
    }
}

function putCity(){
    let newCityName = document.getElementById('edit-city-name').value;
    let cityId = searchId[1];
    if (newCityName.length > 0) {
        urlencoded.append("id", cityId);
        urlencoded.append("name", newCityName);

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("http://localhost:3000/city", requestOptions)
            .then(response => response.json())
            .then(result => {
                data = result;
                console.log(data);
                overlayInputs[3].classList.remove('edit-active');
                if (data.status == 400) {
                    msgPopUp.classList.add('error');
                } else {
                    msgPopUp.classList.add('ok');
                }
                msgTitle.innerText = data.msg;
                console.log(msgTitle.innerText);
                setTimeout(overlayPopUpMsg, 3000);

            })
            .catch(error => console.log('error', error));
    }
}

function deleteCity(){
    $('#jstree').on("changed.jstree", function (e, data) {
        searchId = data.selected[0].split(" ");
        let cityId = searchId[1];
        urlencoded.append("id", cityId);

        let requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            body: urlencoded
        };

        fetch("http://localhost:3000/city", requestOptions)
            .then(response => response.json())
            .then(result => {
                debugger;
                data = result;
                if (data.status == 400) {
                    msgPopUp.classList.add('error');
                } else {
                    msgPopUp.classList.add('ok');
                }
                msgTitle.innerText = data.msg;
                setTimeout(overlayPopUpMsg, 3000);
            })
            .catch(error => console.log('error', error));
    });
}