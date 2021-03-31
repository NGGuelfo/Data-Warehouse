const Sequelize = require('sequelize');
const { config } = require('./config');
const { Ciudad, Usuarios, Contactos, Companias, Regiones, Paises } = require('../models');
const bcrypt = require('bcryptjs');
const password = bcrypt.hashSync('admin1234', 12);

const sequelize = new Sequelize(config.databaseName, config.username, config.password, {
    host: config.host,
    dialect: config.dialect
});

Contactos.belongsTo(Usuarios, {
    constraints: true,
    onDelete: 'CASCADE'
});

Usuarios.hasMany(Contactos);
Contactos.belongsTo(Companias);
Companias.belongsTo(Ciudad);
Contactos.belongsTo(Ciudad);
Contactos.belongsTo(Paises);
Contactos.belongsTo(Regiones);
Paises.hasMany(Ciudad);
Ciudad.belongsTo(Paises);
Regiones.hasMany(Paises);
Paises.belongsTo(Regiones);

const contacts = [{
    id: 1,
    name: 'Nicolas',
    lastname: 'Guelfo',
    email: 'nguelfo@mail.com',
    position: 'Developer',
    phone: '+11158694896',
    img: 'avatar.jpg',
    adress: 'Vallejos 1234',
    interest: 25,
    userId: 1,
    companyId: 1,
    cityId: 1,
    countryId: 1,
    regionId: 2
},
{
    id: 2,
    name: 'Gaston',
    lastname: 'Dandre',
    email: 'gdandre@mail.com',
    position: 'Developer',
    phone: '+5491184561235',
    img: 'avatar.jpg',
    adress: 'Lapegue 1986',
    interest: 100,
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
    name: 'Anto',
    lastname: 'Bayugar',
    email: 'abayugar@mail.com',
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
    name: 'Canada',
    regionId: 2
},
{
    id: 2,
    name: 'Argentina',
    regionId: 1
},
{
    id: 3,
    name: 'EEUU',
    regionId: 2
},
{
    id: 4,
    name: 'Dinamarca',
    regionId: 4
},
{
    id: 5,
    name: 'Nueva Zelanda',
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
    name: 'Alemania',
    regionId: 4
},
{
    id: 10,
    name: 'Polonia',
    regionId: 4
}
];


const cities = [{
    id: 1,
    name: 'Ottawa',
    countryId: 1
},
{
    id: 2,
    name: 'Quebec',
    countryId: 1
},
{
    id: 3,
    name: 'Buenos Aires',
    countryId: 2
},
{
    id: 4,
    name: 'Chubut',
    countryId: 2
},
{
    id: 5,
    name: 'Texas',
    countryId: 3
},
{
    id: 7,
    name: 'California',
    countryId: 3
},
{
    id: 8,
    name: 'Aarhus',
    countryId: 4
},
{
    id: 9,
    name: 'Copenhague',
    countryId: 4
},
{
    id: 10,
    name: 'Wellington',
    countryId: 5
},
{
    id: 11,
    name: 'Queenstown',
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
    name: 'Berlin',
    countryId: 9
},
{
    id: 16,
    name: 'Dublin',
    countryId: 9
},
{
    id: 17,
    name: 'Varsovia',
    countryId: 10
}
];

const companies = [{
    id: 1,
    name: 'Baco Club S.A.',
    adress: 'Av. Lope de Vega 123',
    email: 'contacto@bacoclub.com.ar',
    phone: '0800-122-8569',
    cityId: 4
},
{
    id: 2,
    name: 'Gobierno de la Ciudad de Buenos Aires',
    adress: 'Av. Ingeniero Huergo 949',
    email: 'contacto@gcba.gob.ar',
    phone: '0800-111-8975',
    cityId: 3
}];

sequelize
    .sync({
        force: true
    })
    .then(() => {
        console.log('Base de datos en funcionamiento');
    })
    .then(() => {
        users.forEach(users => Usuarios.create(users));
    })
    .then(() => {
        regions.forEach(regions => Regiones.create(regions));
    })
    .then(() => {
        countries.forEach(countries => Paises.create(countries));
    })
    .then(() => {
        cities.forEach(cities => Ciudad.create(cities));
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
            companies.forEach(companies => Companias.create(companies));
        })
        .then(() => {
            contacts.forEach(contacts => Contactos.create(contacts));
        })
}