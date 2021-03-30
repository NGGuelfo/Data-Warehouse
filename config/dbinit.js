const sequelize = require('../data/database');
const { Contact, User, Contact, Company, Region, Country } = require('../models');
require('../data/associatons');
const bcrypt = require('bcryptjs');
const password = bcrypt.hashSync('admin1234', 12);


const contacts = [{
        id: 1,
        name: 'Carlos',
        lastname: 'Perez',
        email: 'cprez@mail.com',
        position: 'Developer',
        phone: '+549111234567890',
        img: 'avatar.jpg',
        adress: 'Dirección 1234',
        interest: 50,
        userId: 1,
        companyId: 1,
        cityId: 1,
        countryId: 1,
        regionId: 2
    },
    {
        id: 2,
        name: 'Marcelo',
        lastname: 'Gonzalez',
        email: 'mgonzalez@mail.com',
        position: 'Developer',
        phone: '+549111234567890',
        img: 'avatar.jpg',
        adress: 'Dirección 1234',
        interest: 75,
        userId: 1,
        companyId: 1,
        cityId: 1,
        countryId: 1,
        regionId: 2
    }
];

const users = [{
        id: 1,
        name: 'Admin',
        lastname: 'Admin',
        email: 'admin@mail.com',
        admin: 1,
        password: password
    },
    {
        id: 2,
        name: 'User',
        lastname: 'user',
        email: 'user@mail.com',
        admin: 0,
        password: password
    }
];

const regions = [{
        id: 1,
        name: 'Sudamérica'
    },
    {
        id: 2,
        name: 'Norteamérica'
    },
    {
        id: 3,
        name: 'Centroamérica'
    },
    {
        id: 4,
        name: 'Europa'
    },
    {
        id: 5,
        name: 'Asia'
    },
    {
        id: 6,
        name: 'Oceanía'
    }
];

const countries = [{
        id: 1,
        name: 'Estados Unidos',
        regionId: 2
    },
    {
        id: 2,
        name: 'Argentina',
        regionId: 1
    },
    {
        id: 3,
        name: 'Canada',
        regionId: 2
    },
    {
        id: 4,
        name: 'España',
        regionId: 4
    },
    {
        id: 5,
        name: 'Australia',
        regionId: 6
    },
    {
        id: 6,
        name: 'Costa Rica',
        regionId: 3
    },
    {
        id: 7,
        name: 'Panamá',
        regionId: 3
    },
    {
        id: 8,
        name: 'China',
        regionId: 5
    },
    {
        id: 9,
        name: 'Francia',
        regionId: 4
    },
    {
        id: 10,
        name: 'Reino Unido',
        regionId: 4
    }
];


const cities = [{
        id: 1,
        name: 'Miami',
        countryId: 1
    },
    {
        id: 2,
        name: 'New York',
        countryId: 1
    },
    {
        id: 3,
        name: 'Buenos Aires',
        countryId: 2
    },
    {
        id: 4,
        name: 'Neuquén',
        countryId: 2
    },
    {
        id: 5,
        name: 'Toronto',
        countryId: 3
    },
    {
        id: 7,
        name: 'Montreal',
        countryId: 3
    },
    {
        id: 8,
        name: 'Barcelona',
        countryId: 4
    },
    {
        id: 9,
        name: 'Madrid',
        countryId: 4
    },
    {
        id: 10,
        name: 'Sidney',
        countryId: 5
    },
    {
        id: 11,
        name: 'Melbourne',
        countryId: 5
    },
    {
        id: 12,
        name: 'San José',
        countryId: 6
    },
    {
        id: 13,
        name: 'Panamá',
        countryId: 7
    },
    {
        id: 14,
        name: 'Pekín',
        countryId: 8
    },
    {
        id: 15,
        name: 'París',
        countryId: 9
    },
    {
        id: 16,
        name: 'Marsella',
        countryId: 9
    },
    {
        id: 17,
        name: 'Londres',
        countryId: 10
    }
];

const companies = [{
    id: 1,
    name: 'YPF',
    adress: 'Machaca Güemes 515',
    email: 'contacto@ypf.com',
    phone: '011-5441-0000',
    cityId: 3
}];

sequelize
    .sync({
        force: true
    })
    .then(() => {
        console.log('Database connected');
    })
    .then(() => {
        users.forEach(users => User.create(users));
    })
    .then(() => {
        regions.forEach(regions => Region.create(regions));
    })
    .then(() => {
        countries.forEach(countries => Country.create(countries));
    })
    .then(() => {
        cities.forEach(cities => City.create(cities));
    })
    .then(() => {
        setTimeout(crearCyC, 2000);
    })

function crearCyC() {
    sequelize
        .sync({
            force: false
        })
        .then(() => {
            companies.forEach(companies => Company.create(companies));
        })
        .then(() => {
            contacts.forEach(contacts => Contact.create(contacts));
        })
}