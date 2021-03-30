const Company = require('../models');

exports.getAllCompanies = async function (req, res, next) {
    await Company.findAll({
            include: {
                all: true,
                nested: true
            }
        })
        .then(data => {
            //console.log(JSON.stringify(data, null, 2));
            res.status(200).render('home', {
                title: 'Companías',
                msg: 'Companías',
                data: data
            })
        })
        .catch(err => {
            console.log(err);
        });
}

exports.getAllCompaniesJson = async function (req, res, next) {
    await Company.findAll({
            include: {
                all: true,
                nested: true
            }
        })
        .then(data => {
            //console.log(JSON.stringify(data, null, 2));
            res.status(200).json({
                msg: 'Companías',
                data: data,
                status: 200
            })
        })
        .catch(err => {
            console.log(err);
        });
}

exports.postNewCompany = (req, res, next) => {
    const name = req.body.name;
    const adress = req.body.adress;
    const phone = req.body.phone;
    const email = req.body.email;
    const cityId = req.body.cityId;
    Company.create({
            name: name,
            adress: adress,
            email: email,
            phone: phone,
            cityId: cityId
        })
        .then(result => {
            res.status(200).json({
                msg: 'Companía creada.',
                data: result,
                status: 200
            })
        })
        .catch(err => {
            res.status(400).json({
                msg: 'Ocurrió un error, intente mas tarde',
                data: err,
                status: 400
            })
        })
}

exports.deleteCompany = (req, res, next) => {
    const id = req.body.id;
    Company.findByPk(id)
        .then(data => {
            data.destroy();
            res.status(200).json({
                    msg: 'Compania Eliminada',
                    data: data,
                    status: 200
                })
                .catch(err => {
                    res.status(400).json({
                        msg: 'ID erróneo o compania inexistente',
                        data: err,
                        status: 400
                    })
                })
        })
}

exports.editCompany = (req, body, next) => {
    const id = req.body.id;
    const name = req.body.name;
    const adress = req.body.adress;
    const phone = req.body.phone;
    const email = req.body.email;
    const cityId = req.body.cityId;
    Company.findByPk(id)
        .then(data => {
            data.name = name;
            data.adress = adress;
            data.phone = phone;
            data.email = email;
            data.cityId = cityId;
            data.save();
            res.status(200).json({
                msg: 'Companía actualizada',
                data: data,
                status: 200
            })
        })
        .catch(err => {
            res.status(400).json({
                msg: 'ID erróneo o compania inexistente',
                data: err,
                status: 400
            })
        })
}