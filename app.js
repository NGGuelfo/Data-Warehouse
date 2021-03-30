//Importar dependencias instaladas

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const ejs = require('ejs');
const path = require('path');
const ejsLint = require('ejs-lint');
const cookieParser = require('cookie-parser');
const sequelize = require('./data/database');
const {
    config
} = require('./config/config');

require('./data/associatons');
const router = express.Router();
const { authController, upload, searcher } = require ('../middlewares');
const userController = require('../controller/users');
const contactsController = require('../controller/contacts');
const regionController = require('../controller/regions');
const companiesController = require('../controller/companies');


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
router.post('/login', userController.loginUsuario);
router.post('/usuario', authController.validaUsuario, authController.validaAdmin, userController.crearUsuario);
router.get('/usuarios', authController.validaUsuario, authController.validaAdmin, userController.verUsers);
router.put('/usuario', authController.validaUsuario, authController.validaAdmin, userController.editUser);
router.delete('/usuario', authController.validaUsuario, authController.validaAdmin, userController.deleteUser);

//Contactos
router.get('/contactos', authController.validaUsuario, contactsController.getAllContacts);
router.post('/contactos', authController.validaUsuario, contactsController.postNewContact);
router.get('/contactos', authController.validaUsuario, contactsController.getContact);
router.post('/contactos', authController.validaUsuario, contactsController.updateContact);
router.delete('/contactos', authController.validaUsuario, contactsController.deleteContact);
router.get('/contactos', authController.validaUsuario, contactsController.getContactsByRegion);
router.post('/editar-contacto', authController.validaUsuario, upload.single('img'), contactsController.updateContact);
router.post('/uploads', authController.validaUsuario, upload.single('img'), contactsController.postNewContact);
router.get('/form-contact', authController.validaUsuario, contactsController.contactCreateForm);
router.delete('/delete-contactos', authController.validaUsuario, contactsController.deleteAllContacts);
router.post('/orden-contact', authController.validaUsuario, contactsController.orderAscendente);
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
router.post('/region', authController.validaUsuario, authController.validaAdmin, regionController.postNewRegion);
router.get('/region_city', authController.validaUsuario, regionController.allRegions);
router.delete('/region', authController.validaUsuario, regionController.deleteRegion);
router.put('/region', authController.validaUsuario, regionController.updateRegion);
router.get('/region', authController.validaUsuario, regionController.allRegionsJSON);

//Paises
router.post('/country', authController.validaUsuario, authController.validaAdmin, regionController.postNewCountry);
router.delete('/country', authController.validaUsuario, regionController.deleteCountry);
router.put('/country', authController.validaUsuario, regionController.updateCountry);
router.post('/countries', authController.validaUsuario, regionController.getCountries);

//Ciudades
router.post('/city', authController.validaUsuario, authController.validaAdmin, regionController.postNewCity);
router.delete('/city', authController.validaUsuario, regionController.deleteCity);
router.put('/city', authController.validaUsuario, regionController.updateCity);
router.post('/cities', authController.validaUsuario, regionController.getCities);

//Compañias
router.get('/companies', authController.validaUsuario, companiesController.getAllCompanies);
router.get('/companies-json', authController.validaUsuario, companiesController.getAllCompaniesJson);
router.post('/companies', authController.validaUsuario, companiesController.postNewCompany);
router.put('/companies', authController.validaUsuario, companiesController.editCompany);
router.delete('/companies', authController.validaUsuario, companiesController.deleteCompany);

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