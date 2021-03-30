//Importar dependencias instaladas
const Sequelize = require('sequelize');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const ejs = require('ejs');
const path = require('path');
const ejsLint = require('ejs-lint');
const cookieParser = require('cookie-parser');
const { config } = require('./config/config');
const router = express.Router();
const middlewares = require('../middlewares');
const endpointsUsuario = require('../endpoints/users');
const endpointsContacto = require('../endpoints/contacts');
const endpointsRegion = require('../endpoints/regions');
const endpointsCompanias = require('../endpoints/companies');

const sequelize = new Sequelize(config.databaseName, config.username, config.password, {
    host: config.host,
    dialect: config.dialect
});

Contactos.belongsTo(User, {
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

app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(cors());
router.get('/', (req, res) => {
    res.render('index', {
        title: 'Data Warehouse'
    });
});

//Endpoints

//Usuario
router.post('/login', endpointsUsuario.loginUsuario);
router.post('/usuario', middlewares.validaUsuario, middlewares.validaAdmin, endpointsUsuario.crearUsuario);
router.get('/usuarios', middlewares.validaUsuario, middlewares.validaAdmin, endpointsUsuario.verUsers);
router.put('/usuario', middlewares.validaUsuario, middlewares.validaAdmin, endpointsUsuario.editUser);
router.delete('/usuario', middlewares.validaUsuario, middlewares.validaAdmin, endpointsUsuario.deleteUser);

//Contactos
router.get('/contactos', middlewares.validaUsuario, endpointsContacto.getAllContacts);
router.post('/contactos', middlewares.validaUsuario, endpointsContacto.postNewContact);
router.get('/contactos', middlewares.validaUsuario, endpointsContacto.getContact);
router.post('/contactos', middlewares.validaUsuario, endpointsContacto.updateContact);
router.delete('/contactos', middlewares.validaUsuario, endpointsContacto.deleteContact);
router.get('/contactos', middlewares.validaUsuario, endpointsContacto.getContactsByRegion);
router.post('/editar-contacto', middlewares.validaUsuario, middlewares.single('img'), endpointsContacto.updateContact);
router.post('/uploads', middlewares.validaUsuario, middlewares.single('img'), endpointsContacto.postNewContact);
router.get('/form-contact', middlewares.validaUsuario, endpointsContacto.contactCreateForm);
router.delete('/delete-contactos', middlewares.validaUsuario, endpointsContacto.deleteAllContacts);
router.post('/orden-contact', middlewares.validaUsuario, endpointsContacto.orderAscendente);
router.post('/search-contacto', middlewares.validaUsuario,
    middlewares.buscarNombre,
    middlewares.busquedaApellido,
    middlewares.busquedaMail,
    middlewares.busquedaPuesto,
    middlewares.busquedaInteres,
    middlewares.busquedaTelefono,
    middlewares.busquedaCompania,
    middlewares.busquedaRegión,
    middlewares.busquedaCountry,
    middlewares.busquedaCiudad
);

//Region
router.post('/region', middlewares.validaUsuario, middlewares.validaAdmin, endpointsRegion.postNewRegion);
router.get('/region_city', middlewares.validaUsuario, endpointsRegion.allRegions);
router.delete('/region', middlewares.validaUsuario, endpointsRegion.deleteRegion);
router.put('/region', middlewares.validaUsuario, endpointsRegion.updateRegion);
router.get('/region', middlewares.validaUsuario, endpointsRegion.allRegionsJSON);

//Paises
router.post('/country', middlewares.validaUsuario, middlewares.validaAdmin, endpointsRegion.postNewCountry);
router.delete('/country', middlewares.validaUsuario, endpointsRegion.deleteCountry);
router.put('/country', middlewares.validaUsuario, endpointsRegion.updateCountry);
router.post('/countries', middlewares.validaUsuario, endpointsRegion.getCountries);

//Ciudades
router.post('/city', middlewares.validaUsuario, middlewares.validaAdmin, endpointsRegion.postNewCity);
router.delete('/city', middlewares.validaUsuario, endpointsRegion.deleteCity);
router.put('/city', middlewares.validaUsuario, endpointsRegion.updateCity);
router.post('/cities', middlewares.validaUsuario, endpointsRegion.getCities);

//Compañias
router.get('/companies', middlewares.validaUsuario, endpointsCompanias.getAllCompanies);
router.get('/companies-json', middlewares.validaUsuario, endpointsCompanias.getAllCompaniesJson);
router.post('/companies', middlewares.validaUsuario, endpointsCompanias.postNewCompany);
router.put('/companies', middlewares.validaUsuario, endpointsCompanias.editCompany);
router.delete('/companies', middlewares.validaUsuario, endpointsCompanias.deleteCompany);

sequelize
    .sync()
    .then(() => {
        app.listen(config.app_port, () => {
            console.log('Server initializated on port: ' + config.app_port);
        })
    })
    .catch(err => {
        console.log(err);
    });