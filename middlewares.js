const { jwt, firma, Contactos, Ciudad, Regiones, Companias, Paises, Usuarios } = require('./models');
const multer = require('multer');

function validaUsuario(req, res, next) {
    try {
        const token = req.cookies.access_token;
        const tokenVerification = jwt.verify(token, firma);
        const Id = tokenVerification.userData.id
        if (tokenVerification) {
            Usuarios.findByPk(Id)
                .then((user) => {
                    req.user = user;
                    next();
                }).catch(err => {
                    console.log(err);
                });
        } else {
            res.status(400).send('Error al validar usuario.')
        }
    } catch (err) {
        console.log(err);
        res.status(400).send('Usuario no existente');
    }
}

function validaAdmin(req, res, next) {
    try {
        const token = req.cookies.access_token;
        const tokenVerification = jwt.verify(token, firma);
        if (tokenVerification.userData.admin == 1) {
            return next();
        } else {
            res.status(400).send('No posees permisos de administrador.')
        }
    } catch (err) {
        res.status(400).send('No se encontró usuario registrado.')
    }
}

function buscarNombre(req, res, next) {
    const search = req.body.search;
    Contactos.findAll({
        where: {
            name: search
        },
        include: {
            all: true,
            nested: true
        }
    })
        .then((result) => {
            if (result.length > 0) {
                console.log(JSON.stringify(result, null, 2));
                res.status(200).render('home', {
                    title: 'Contactos',
                    msg: 'Contactos',
                    data: result,
                    status: 200
                })
            } else {
                next();
            }
        })
        .catch(err => {
            res.status(400).render('home', {
                title: 'Contactos',
                msg: 'Error Encontrado. Intente mas tarde',
                data: err,
                status: 400
            });
        })
}

function buscarApellido(req, res, next) {
    const search = req.body.search;
    Contactos.findAll({
        where: {
            lastname: search
        },
        include: {
            all: true,
            nested: true
        }
    })
        .then((resultado) => {
            if (resultado.length > 0) {
                console.log(JSON.stringify(resultado, null, 2));
                res.status(200).render('home', {
                    title: 'Contactos',
                    msg: 'Contactos',
                    data: resultado,
                    status: 200
                })
            } else {
                next();
            }
        })
        .catch(err => {
            res.status(400).render('home', {
                title: 'Contactos',
                msg: 'Problema Encontrado. Intente mas tarde',
                data: err,
                status: 400
            });
        })
}

function validaMail(req, res, next) {
    const search = req.body.search;
    Contactos.findAll({
        where: {
            email: search
        },
        include: {
            all: true,
            nested: true
        }
    })
        .then((result) => {
            if (result.length > 0) {
                console.log(JSON.stringify(result, null, 2));
                res.status(200).render('home', {
                    title: 'Contactos',
                    msg: 'Contactos',
                    data: result,
                    status: 200
                })
            } else {
                next();
            }
        })
        .catch(err => {
            res.status(400).render('home', {
                title: 'Contactos',
                msg: 'ERROR 400. Intente mas Tarde',
                data: err,
                status: 400
            });
        })
}

function checkTelefono(req, res, next) {
    const search = req.body.search;
    Contactos.findAll({
        where: {
            phone: search
        },
        include: {
            all: true,
            nested: true
        }
    })
        .then((resultado) => {
            if (resultado.length > 0) {
                console.log(JSON.stringify(resultado, null, 2));
                res.status(200).render('home', {
                    title: 'Contactos',
                    msg: 'Contactos',
                    data: resultado,
                    status: 200
                })
            } else {
                next();
            }
        })
        .catch(err => {
            res.status(400).render('home', {
                title: 'Contactos',
                msg: 'Error 400. Intente nuevamente mas tarde.',
                data: err,
                status: 400
            });
        })
}

function existePuesto(req, res, next) {
    const search = req.body.search;
    Contactos.findAll({
        where: {
            position: search
        },
        include: {
            all: true,
            nested: true
        }
    })
        .then((resultado) => {
            if (resultado.length > 0) {
                console.log(JSON.stringify(resultado, null, 2));
                res.status(200).render('home', {
                    title: 'Contactos',
                    msg: 'Contactos',
                    data: resultado,
                    status: 200
                })
            } else {
                next();
            }
        })
        .catch(err => {
            res.status(400).render('home', {
                title: 'Contactos',
                msg: 'Ocurrió un error, intente mas tarde.',
                data: err,
                status: 400
            });
        })
}

function buscarInteres(req, res, next) {
    const search = req.body.search;
    Contactos.findAll({
        where: {
            interest: search
        },
        include: {
            all: true,
            nested: true
        }
    })
        .then((result) => {
            if (result.length > 0) {
                console.log(JSON.stringify(result, null, 2));
                res.status(200).render('home', {
                    title: 'Contactos',
                    msg: 'Contactos',
                    data: result,
                    status: 200
                })
            } else {
                next();
            }
        })
        .catch(err => {
            res.status(400).render('home', {
                title: 'Contactos',
                msg: 'Ocurrió un error.',
                data: err,
                status: 400
            });
        })
}

function searchCompany(req, res, next) {
    const search = req.body.search;
    Companias.findAll({
        where: {
            name: search
        }
    })
        .then(data => {
            if (data.length > 0) {
                const companyId = data[0].dataValues.id;
                Contactos.findAll({
                    where: {
                        companyId: companyId
                    },
                    include: {
                        all: true,
                        nested: true
                    }
                })
                    .then(data => {
                        console.log(JSON.stringify(data, null, 2));
                        res.status(200).render('home', {
                            title: 'Contactos',
                            msg: 'Contactos',
                            data: data,
                            status: 200
                        })
                    })
                    .catch(err => {
                        res.status(404).render('home', {
                            title: 'Contactos',
                            msg: 'No encontrado.',
                            data: err,
                            status: 404
                        });
                    })
            } else {
                next();
            }
        })
        .catch(err => {
            res.status(400).render('home', {
                title: 'Contactos',
                msg: 'Intente mas tarde.',
                data: err,
                status: 400
            });
        })
}

function busquedaRegión(req, res, next) {
    const search = req.body.search;
    Regiones.findAll({
        where: {
            name: search
        }
    })
        .then(data => {
            if (data.length > 0) {
                const Id = data[0].dataValues.id;
                console.log(Id);
                Contactos.findAll({
                    where: {
                        regionId: Id
                    },
                    include: {
                        all: true,
                        nested: true
                    }
                })
                    .then(data => {
                        console.log(JSON.stringify(data, null, 2));
                        res.status(200).render('home', {
                            title: 'Contactos',
                            msg: 'Contactos',
                            data: data,
                            status: 200
                        })
                    })
                    .catch(err => {
                        res.status(400).render('home', {
                            title: 'Error',
                            msg: 'Ocurrió un error.',
                            data: err,
                            status: 400
                        });
                    })
            } else {
                next();
            }
        })
        .catch(err => {
            res.status(400).render('home', {
                title: 'Error 400',
                msg: 'Ocurrió un error, intente mas tarde.',
                data: err,
                status: 400
            });
        })
}

function checkCiudad(req, res, next) {
    const search = req.body.search;
    Ciudad.findAll({
        where: {
            name: search
        }
    })
        .then(data => {
            if (data.length > 0) {
                const Id = data[0].dataValues.id;
                Contactos.findAll({
                    where: {
                        cityId: Id
                    },
                    include: {
                        all: true,
                        nested: true
                    }
                })
                    .then(data => {
                        console.log(JSON.stringify(data, null, 2));
                        res.status(200).render('home', {
                            title: 'Contactos',
                            msg: 'Contactos',
                            data: data,
                            status: 200
                        })
                    })
                    .catch(err => {
                        res.status(400).render('home', {
                            title: 'Contactos',
                            msg: 'Error, intente mas tarde.',
                            data: err,
                            status: 400
                        });
                    })
            } else {
                res.status(200).render('home', {
                    title: 'Contactos',
                    msg: 'Contactos',
                    data: data,
                    status: 200
                })
            }
        })
        .catch(err => {
            res.status(400).render('home', {
                title: 'Contactos',
                msg: 'Ocurrió un error.',
                data: err,
                status: 400
            });
        })
}

function buscarPais(req, res, next) {
    const search = req.body.search;
    Paises.findAll({
        where: {
            name: search
        }
    })
        .then(data => {
            if (data.length > 0) {
                const Id = data[0].dataValues.id;
                Contactos.findAll({
                    where: {
                        countryId: Id
                    },
                    include: {
                        all: true,
                        nested: true
                    }
                })
                    .then(data => {
                        console.log(JSON.stringify(data, null, 2));
                        res.status(200).render('home', {
                            title: 'Contactos',
                            msg: 'Contactos',
                            data: data,
                            status: 200
                        })
                    })
                    .catch(err => {
                        res.status(400).render('home', {
                            title: 'Error 400',
                            msg: 'Intente mas tarde.',
                            data: err,
                            status: 400
                        });
                    })
            } else {
                next();
            }
        })
        .catch(err => {
            res.status(400).render('home', {
                title: 'Contactos',
                msg: 'Ocurrió un error, intente mas tarde.',
                data: err,
                status: 400
            });
        })
}

const almacena = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
        let formato = file.mimetype.split('/');
        cb(null, `${file.fieldname}-${Date.now()}.${formato[formato.length - 1]}`)
    }
})

const carga = multer({
    storage: almacena
});

module.exports =
{
    buscarPais,
    carga,
    checkCiudad,
    busquedaRegión,
    searchCompany,
    buscarInteres,
    existePuesto,
    checkTelefono,
    validaMail,
    buscarApellido,
    buscarNombre,
    validaAdmin,
    validaUsuario
}