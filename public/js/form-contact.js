let selectRegion = document.getElementById('select-region');
let selectCountry = document.getElementById('select-country');
let selectCity = document.getElementById('select-city');
let selectCompany = document.getElementById('select-company');

let regions;
let countries;
let cities;
let companies;
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

fetch("http://localhost:3000/companies-json", requestOptions)
    .then(response => response.json())
    .then(result => {
        companies = result.data;
        companies.sort(function (a, b) {
            let textA = a.name;
            let textB = b.name;
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
        for (value in companies) {
            let option = document.createElement('option');
            option.text = companies[value].name;
            option.value = companies[value].id;
            selectCompany.add(option);
        }
    })
    .catch(error => console.log('error', error));

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
