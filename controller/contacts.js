const Contact = require('../models');
const Sequelize = require('sequelize');
const {
    col
} = require('sequelize');
const Op = Sequelize.Op;

exports.postNewContact = (req, res, next) => {
    console.log(req.file);
    let newImg;
    if (req.file == undefined) {
        newImg = 'avatar.jpg';
    } else {
        newImg = req.file.filename;
    }
    const newName = req.body.name;
    const newLastname = req.body.lastname;
    const newEmail = req.body.email;
    const newPhone = req.body.phone;
    const newAdress = req.body.adress;
    const newCompany = req.body.companyId;
    const newCity = req.body.cityId;
    const newPosition = req.body.position;
    const newInterest = req.body.interest;
    const newRegion = req.body.regionId;
    const newCountry = req.body.countryId;
    req.user.createContact({
            name: newName,
            lastname: newLastname,
            email: newEmail,
            phone: newPhone,
            img: newImg,
            adress: newAdress,
            companyId: newCompany,
            cityId: newCity,
            position: newPosition,
            interest: newInterest,
            countryId: newCountry,
            regionId: newRegion
        })
        .then(data => {
            res.status(200).redirect('http://localhost:3000/contactos')
        })
        .catch(err => {
            res.status(400).json({
                msg: 'Ocurrió un error, intente mas tarde.',
                data: err,
                status: 400
            });
        })
}

exports.getAllContacts = (req, res, next) => {
    Contact.findAll({
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
}


exports.getContact = (req, res, next) => {
    const contactId = req.body.id;
    Contact.findByPk(contactId)
        .then(data => {
            res.status(200).json({
                msg: 'Datos Contacto',
                data: data
            });
        })
        .catch(err => {
            res.status(400).json({
                msg: 'ID erróneo o contacto inexistente',
                error: err
            });
        })
}

exports.updateContact = (req, res, next) => {
    console.log(req.file);
    let newImg;
    if (req.file == undefined) {
        newImg = 'avatar.jpg';
    } else {
        newImg = req.file.filename;
    }
    console.log(req.body.id);
    const contactId = req.body.id;
    const newName = req.body.name;
    const newLastname = req.body.lastname;
    const newEmail = req.body.email;
    const newPhone = req.body.phone;
    const newAdress = req.body.adress;
    const newCompany = req.body.companyId;
    const newCity = req.body.cityId;
    const newPosition = req.body.position;
    const newInterest = req.body.interest;
    const newRegion = req.body.regionId;
    const newCountry = req.body.countryId;
    Contact.findByPk(contactId)
        .then(contact => {
            contact.name = newName;
            contact.lastname = newLastname;
            contact.email = newEmail;
            contact.phone = newPhone;
            contact.img = newImg;
            contact.adress = newAdress;
            contact.companyId = newCompany;
            contact.cityId = newCity;
            contact.position = newPosition;
            contact.interest = newInterest;
            contact.regionId = newRegion;
            contact.countryId = newCountry;
            contact.save();
            res.status(200).redirect('http://localhost:3000/contactos');
        })
        .catch(err => {
            res.status(400).json({
                msg: 'ID erróneo o contacto inexistente',
                error: err
            });
        })
}

exports.deleteContact = (req, res, next) => {
    const contactId = req.body.id;
    Contact.findByPk(contactId)
        .then(contact => {
            contact.destroy();
            res.status(200).json({
                msg: 'Contacto borrado',
                data: contact
            });
        })
        .catch(err => {
            res.status(400).json({
                msg: 'ID erróneo o contacto inexistente',
                error: err
            });
        })
}

exports.deleteAllContacts = (req, res, next) => {
    const id = req.body.ids;
    const ids = id.split(',');
    Contact.destroy({
            where: {
                id: ids
            }
        })
        .then(data => {
            res.status(200).json({
                msg: 'Contactos eliminados',
                data: data
            });
        })
        .catch(err => {
            res.status(400).json({
                msg: 'ID erróneo o contacto inexistente',
                error: err
            });
        })
}


exports.getContactsByRegion = (req, res, next) => {
    const regionId = req.body.search;
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
}

exports.getContactsByCompany = (req, res, next) => {
    const companyId = req.body.search;
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
}

exports.getContactsByCity = (req, res, next) => {
    const cityId = req.body.search;
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
}

exports.getContactsByCountry = (req, res, next) => {
    const countryId = req.body.search;
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
}

exports.contactCreateForm = (req, res, next) => {
    res.status(200).render('form-contact', {
        title: 'Crear Contacto',
        msg: 'Form Create Contact'
    })
}

exports.orderAscendente = (req, res, next) => {
    const column = req.body.title;
    const direction = req.body.direction;
    console.log(column);
    console.log(direction);
    Contact.findAll({
            order: [
                [column, direction]
            ],
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
}