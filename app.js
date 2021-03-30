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
const { buscarPais, checkCiudad, busquedaRegión, searchCompany, buscarInteres, existePuesto, checkTelefono, validaMail, buscarApellido, buscarNombre, validaAdmin, validaUsuario } = require('./middlewares');
const endpointsUsuario = require('./endpoints/usuarios');
const endpointsContacto = require('./endpoints/contactos');
const endpointsRegion = require('./endpoints/regiones');
const { buscarCompanias, buscarCompaniasJson, nuevaCompania, borrarCompania, editarCompania} = require('./endpoints/companias');

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
router.post('/usuario', validaUsuario, validaAdmin, endpointsUsuario.crearUsuario);
router.get('/usuarios', validaUsuario, validaAdmin, endpointsUsuario.verUsers);
router.put('/usuario', validaUsuario, validaAdmin, endpointsUsuario.editUser);
router.delete('/usuario', validaUsuario, validaAdmin, endpointsUsuario.deleteUser);

//Contactos
router.get('/contactos', validaUsuario, endpointsContacto.getAllContacts);
router.post('/contactos', validaUsuario, endpointsContacto.postNewContact);
router.get('/contactos', validaUsuario, endpointsContacto.getContact);
router.post('/contactos', validaUsuario, endpointsContacto.updateContact);
router.delete('/contactos', validaUsuario, endpointsContacto.deleteContact);
router.get('/contactos', validaUsuario, endpointsContacto.getContactsByRegion);
router.post('/editar-contacto', validaUsuario, single('img'), endpointsContacto.updateContact);
router.post('/uploads', validaUsuario, single('img'), endpointsContacto.postNewContact);
router.get('/form-contact', validaUsuario, endpointsContacto.contactCreateForm);
router.delete('/delete-contactos', validaUsuario, endpointsContacto.deleteAllContacts);
router.post('/orden-contact', validaUsuario, endpointsContacto.orderAscendente);
router.post('/search-contacto', validaUsuario, buscarNombre, buscarApellido, validaMail, existePuesto, buscarInteres, checkTelefono, searchCompany, busquedaRegión, buscarPais, checkCiudad);

//Region
router.post('/region', validaUsuario, validaAdmin, endpointsRegion.postNewRegion);
router.get('/region_city', validaUsuario, endpointsRegion.allRegions);
router.delete('/region', validaUsuario, endpointsRegion.deleteRegion);
router.put('/region', validaUsuario, endpointsRegion.updateRegion);
router.get('/region', validaUsuario, endpointsRegion.allRegionsJSON);

//Paises
router.post('/country', validaUsuario, validaAdmin, endpointsRegion.postNewCountry);
router.delete('/country', validaUsuario, endpointsRegion.deleteCountry);
router.put('/country', validaUsuario, endpointsRegion.updateCountry);
router.post('/countries', validaUsuario, endpointsRegion.getCountries);

//Ciudades
router.post('/city', validaUsuario, validaAdmin, endpointsRegion.postNewCity);
router.delete('/city', validaUsuario, endpointsRegion.deleteCity);
router.put('/city', validaUsuario, endpointsRegion.updateCity);
router.post('/cities', validaUsuario, endpointsRegion.getCities);

//Compañias
router.get('/companies', validaUsuario, buscarCompanias);
router.get('/companies-json', validaUsuario, buscarCompaniasJson);
router.post('/companies', validaUsuario, nuevaCompania);
router.put('/companies', validaUsuario, editarCompania);
router.delete('/companies', validaUsuario, borrarCompania);

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