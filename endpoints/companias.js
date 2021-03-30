const Companias = require('../models');

async function buscarCompanias(req, res, next) {
    await Companias.findAll({
        include: {
            all: true,
            nested: true
        }
    })
        .then(data => {
            //console.log(JSON.stringify(data, null, 2));
            res.status(200).render('home', {
                data: data
            })
        })
        .catch(err => {
            console.log(err);
        });
}

async function buscarCompaniasJson(req, res, next) {
    await Companias.findAll({
        include: {
            all: true,
            nested: true
        }
    })
        .then(data => {
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

async function nuevaCompania(req, res, next){
    const name = req.body.name;
    const adress = req.body.adress;
    const phone = req.body.phone;
    const email = req.body.email;
    const cityId = req.body.cityId;

    Companias.create({
        name: name,
        adress: adress,
        email: email,
        phone: phone,
        cityId: cityId
    })
        .then(result => {
            res.status(200).json({
                msg: 'Companía creada Exitosamente.',
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

async function borrarCompania(req, res, next)
{
    const id = req.body.id;
    Companias.findByPk(id)
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

async function editarCompania(req, body, next){
    const id = req.body.id;
    const name = req.body.name;
    const adress = req.body.adress;
    const phone = req.body.phone;
    const email = req.body.email;
    const cityId = req.body.cityId;
    Companias.findByPk(id)
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
                msg: 'Compania inexistente',
                data: err,
                status: 400
            })
        })
}

module.exports = {
    buscarCompanias,
    buscarCompaniasJson,
    nuevaCompania,
    borrarCompania,
    editarCompania

}