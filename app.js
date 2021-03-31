//Importar dependencias instaladas
const Sequelize = require('sequelize');
const {Usuarios, Contactos, Companias, Ciudad, Paises, Regiones} = require ('./models');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const ejs = require('ejs');
const path = require('path');
const ejsLint = require('ejs-lint');
const cookieParser = require('cookie-parser');
const  config = require('./config/config');
const router = express.Router();
const { middlewares, buscarPais, checkCiudad, busquedaRegión, searchCompany, buscarInteres, existePuesto, checkTelefono, validaMail, buscarApellido, buscarNombre, validaAdmin, validaUsuario } = require('./middlewares');
const { crearUsuario, loginUsuario, verUsuarios, editarUsuarios, borrarUsuarios } = require('./endpoints/usuarios');
const { nuevoContacto, buscarContacto, buscarContactos, editarContacto, borrarContacto, borrarContactos, contactoPorRegion, contactoPorPais, contactoPorCiudad, contactoPorCompania, formularioContacto, ordenarContacto } = require('./endpoints/contactos');
const { nuevaRegion, buscarRegiones, buscarRegionesJSON, borrarRegion, editarRegion, nuevoPais, buscarPaises, editarPais, borrarPais, nuevaCiudad, buscarCiudades, editarCiudad, borrarCiudad } = require('./endpoints/regiones');
const { buscarCompanias, buscarCompaniasJson, nuevaCompania, borrarCompania, editarCompania } = require('./endpoints/companias');

const sequelize = new Sequelize(config.databaseName, config.username, {
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
router.post('/login', loginUsuario);
router.post('/usuario', validaUsuario, validaAdmin, crearUsuario);
router.get('/usuarios', validaUsuario, validaAdmin, verUsuarios);
router.put('/usuario', validaUsuario, validaAdmin, editarUsuarios);
router.delete('/usuario', validaUsuario, validaAdmin, borrarUsuarios);

//Contactos
router.get('/contactos', validaUsuario, buscarContactos);
router.post('/contactos', validaUsuario, nuevoContacto);
router.get('/contactos', validaUsuario, buscarContacto);
router.post('/contactos', validaUsuario, editarContacto);
router.delete('/contactos', validaUsuario, borrarContacto);
router.get('/contactos', validaUsuario, contactoPorRegion);
//router.post('/editar-contacto', validaUsuario, middlewares.single('img'), editarContacto);
//router.post('/uploads', validaUsuario, middlewares.single('img'), nuevoContacto);
router.get('/form-contact', validaUsuario, formularioContacto);
router.delete('/delete-contactos', validaUsuario, borrarContactos);
router.post('/orden-contact', validaUsuario, ordenarContacto);
router.post('/search-contacto', validaUsuario, buscarNombre, buscarApellido, validaMail, existePuesto, buscarInteres, checkTelefono, searchCompany, busquedaRegión, buscarPais, checkCiudad);

//Region
router.post('/region', validaUsuario, validaAdmin, nuevaRegion);
router.get('/region_city', validaUsuario, buscarRegiones);
router.delete('/region', validaUsuario, borrarRegion);
router.put('/region', validaUsuario, editarRegion);
router.get('/region', validaUsuario, buscarRegionesJSON);

//Paises
router.post('/country', validaUsuario, validaAdmin, nuevoPais);
router.delete('/country', validaUsuario, borrarPais);
router.put('/country', validaUsuario, editarPais);
router.post('/countries', validaUsuario, buscarPaises);

//Ciudades
router.post('/city', validaUsuario, validaAdmin, nuevaCiudad);
router.delete('/city', validaUsuario, borrarCiudad);
router.put('/city', validaUsuario, editarCiudad);
router.post('/cities', validaUsuario, buscarCiudades);

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