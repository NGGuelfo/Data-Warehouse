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
const { authController, upload, searcher } = require('../middlewares');
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
router.post('/usuario', authController.validaUsuario, authController.validaAdmin, endpointsUsuario.crearUsuario);
router.get('/usuarios', authController.validaUsuario, authController.validaAdmin, endpointsUsuario.verUsers);
router.put('/usuario', authController.validaUsuario, authController.validaAdmin, endpointsUsuario.editUser);
router.delete('/usuario', authController.validaUsuario, authController.validaAdmin, endpointsUsuario.deleteUser);

//Contactos
router.get('/contactos', authController.validaUsuario, endpointsContacto.getAllContacts);
router.post('/contactos', authController.validaUsuario, endpointsContacto.postNewContact);
router.get('/contactos', authController.validaUsuario, endpointsContacto.getContact);
router.post('/contactos', authController.validaUsuario, endpointsContacto.updateContact);
router.delete('/contactos', authController.validaUsuario, endpointsContacto.deleteContact);
router.get('/contactos', authController.validaUsuario, endpointsContacto.getContactsByRegion);
router.post('/editar-contacto', authController.validaUsuario, upload.single('img'), endpointsContacto.updateContact);
router.post('/uploads', authController.validaUsuario, upload.single('img'), endpointsContacto.postNewContact);
router.get('/form-contact', authController.validaUsuario, endpointsContacto.contactCreateForm);
router.delete('/delete-contactos', authController.validaUsuario, endpointsContacto.deleteAllContacts);
router.post('/orden-contact', authController.validaUsuario, endpointsContacto.orderAscendente);
router.post('/search-contacto', authController.validaUsuario,
    searcher.buscarNombre,
    searcher.busquedaApellido,
    searcher.busquedaMail,
    searcher.busquedaPuesto,
    searcher.busquedaInteres,
    searcher.busquedaTelefono,
    searcher.busquedaCompania,
    searcher.busquedaRegión,
    searcher.busquedaCountry,
    searcher.busquedaCiudad
);

//Region
router.post('/region', authController.validaUsuario, authController.validaAdmin, endpointsRegion.postNewRegion);
router.get('/region_city', authController.validaUsuario, endpointsRegion.allRegions);
router.delete('/region', authController.validaUsuario, endpointsRegion.deleteRegion);
router.put('/region', authController.validaUsuario, endpointsRegion.updateRegion);
router.get('/region', authController.validaUsuario, endpointsRegion.allRegionsJSON);

//Paises
router.post('/country', authController.validaUsuario, authController.validaAdmin, endpointsRegion.postNewCountry);
router.delete('/country', authController.validaUsuario, endpointsRegion.deleteCountry);
router.put('/country', authController.validaUsuario, endpointsRegion.updateCountry);
router.post('/countries', authController.validaUsuario, endpointsRegion.getCountries);

//Ciudades
router.post('/city', authController.validaUsuario, authController.validaAdmin, endpointsRegion.postNewCity);
router.delete('/city', authController.validaUsuario, endpointsRegion.deleteCity);
router.put('/city', authController.validaUsuario, endpointsRegion.updateCity);
router.post('/cities', authController.validaUsuario, endpointsRegion.getCities);

//Compañias
router.get('/companies', authController.validaUsuario, endpointsCompanias.getAllCompanies);
router.get('/companies-json', authController.validaUsuario, endpointsCompanias.getAllCompaniesJson);
router.post('/companies', authController.validaUsuario, endpointsCompanias.postNewCompany);
router.put('/companies', authController.validaUsuario, endpointsCompanias.editCompany);
router.delete('/companies', authController.validaUsuario, endpointsCompanias.deleteCompany);

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