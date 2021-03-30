const { jwt, firma, Contact, City, Region, Company, Country, User } = require('../models');
const multer = require('multer');

function validaUsuario(req, res, next) {
    try {
        const token = req.cookies.access_token;
        const tokenVerification = jwt.verify(token, firma);
        const Id = tokenVerification.userData.id
        if (tokenVerification) {
            User.findByPk(Id)
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
    Contact.findAll({
        where: {
            name: search
        },
        include: {
            all: true,
            nested: true
        }
    })
        .then((contacts) => {
            if (contacts.length > 0) {
                console.log(JSON.stringify(contacts, null, 2));
                res.status(200).render('home', {
                    title: 'Contactos',
                    msg: 'Contactos',
                    data: contacts,
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

function buscarApellido(req, res, next) {
    const search = req.body.search;
    Contact.findAll({
        where: {
            lastname: search
        },
        include: {
            all: true,
            nested: true
        }
    })
        .then((contacts) => {
            if (contacts.length > 0) {
                console.log(JSON.stringify(contacts, null, 2));
                res.status(200).render('home', {
                    title: 'Contactos',
                    msg: 'Contactos',
                    data: contacts,
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

function validaMail(req, res, next) {
    const search = req.body.search;
    Contact.findAll({
        where: {
            email: search
        },
        include: {
            all: true,
            nested: true
        }
    })
        .then((contacts) => {
            if (contacts.length > 0) {
                console.log(JSON.stringify(contacts, null, 2));
                res.status(200).render('home', {
                    title: 'Contactos',
                    msg: 'Contactos',
                    data: contacts,
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

function checkTelefono(req, res, next) {
    const search = req.body.search;
    Contact.findAll({
        where: {
            phone: search
        },
        include: {
            all: true,
            nested: true
        }
    })
        .then((contacts) => {
            if (contacts.length > 0) {
                console.log(JSON.stringify(contacts, null, 2));
                res.status(200).render('home', {
                    title: 'Contactos',
                    msg: 'Contactos',
                    data: contacts,
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

function existePuesto(req, res, next) {
    const search = req.body.search;
    Contact.findAll({
        where: {
            position: search
        },
        include: {
            all: true,
            nested: true
        }
    })
        .then((contacts) => {
            if (contacts.length > 0) {
                console.log(JSON.stringify(contacts, null, 2));
                res.status(200).render('home', {
                    title: 'Contactos',
                    msg: 'Contactos',
                    data: contacts,
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
    Contact.findAll({
        where: {
            interest: search
        },
        include: {
            all: true,
            nested: true
        }
    })
        .then((contacts) => {
            if (contacts.length > 0) {
                console.log(JSON.stringify(contacts, null, 2));
                res.status(200).render('home', {
                    title: 'Contactos',
                    msg: 'Contactos',
                    data: contacts,
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

function searchCompany(req, res, next) {
    const search = req.body.search;
    Company.findAll({
        where: {
            name: search
        }
    })
        .then(company => {
            if (company.length > 0) {
                const companyId = company[0].dataValues.id;
                Contact.findAll({
                    where: {
                        companyId: companyId
                    },
                    include: {
                        all: true,
                        nested: true
                    }
                })
                    .then(contacts => {
                        console.log(JSON.stringify(contacts, null, 2));
                        res.status(200).render('home', {
                            title: 'Contactos',
                            msg: 'Contactos',
                            data: contacts,
                            status: 200
                        })
                    })
                    .catch(err => {
                        res.status(400).render('home', {
                            title: 'Contactos',
                            msg: 'Ocurrió un error, intente mas tarde.',
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

function busquedaRegión(req, res, next) {
    const search = req.body.search;
    Region.findAll({
        where: {
            name: search
        }
    })
        .then(region => {
            if (region.length > 0) {
                const regionId = region[0].dataValues.id;
                console.log(regionId);
                Contact.findAll({
                    where: {
                        regionId: regionId
                    },
                    include: {
                        all: true,
                        nested: true
                    }
                })
                    .then(contacts => {
                        console.log(JSON.stringify(contacts, null, 2));
                        res.status(200).render('home', {
                            title: 'Contactos',
                            msg: 'Contactos',
                            data: contacts,
                            status: 200
                        })
                    })
                    .catch(err => {
                        res.status(400).render('home', {
                            title: 'Contactos',
                            msg: 'Ocurrió un error, intente mas tarde.',
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

function checkCiudad(req, res, next) {
    const search = req.body.search;
    City.findAll({
        where: {
            name: search
        }
    })
        .then(city => {
            if (city.length > 0) {
                const cityId = city[0].dataValues.id;
                Contact.findAll({
                    where: {
                        cityId: cityId
                    },
                    include: {
                        all: true,
                        nested: true
                    }
                })
                    .then(contacts => {
                        console.log(JSON.stringify(contacts, null, 2));
                        res.status(200).render('home', {
                            title: 'Contactos',
                            msg: 'Contactos',
                            data: contacts,
                            status: 200
                        })
                    })
                    .catch(err => {
                        res.status(400).render('home', {
                            title: 'Contactos',
                            msg: 'Ocurrió un error, intente mas tarde.',
                            data: err,
                            status: 400
                        });
                    })
            } else {
                res.status(200).render('home', {
                    title: 'Contactos',
                    msg: 'Contactos',
                    data: city,
                    status: 200
                })
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

function buscarPais(req, res, next) {
    const search = req.body.search;
    Country.findAll({
        where: {
            name: search
        }
    })
        .then(country => {
            if (country.length > 0) {
                const countryId = country[0].dataValues.id;
                Contact.findAll({
                    where: {
                        countryId: countryId
                    },
                    include: {
                        all: true,
                        nested: true
                    }
                })
                    .then(contacts => {
                        console.log(JSON.stringify(contacts, null, 2));
                        res.status(200).render('home', {
                            title: 'Contactos',
                            msg: 'Contactos',
                            data: contacts,
                            status: 200
                        })
                    })
                    .catch(err => {
                        res.status(400).render('home', {
                            title: 'Contactos',
                            msg: 'Ocurrió un error, intente mas tarde.',
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