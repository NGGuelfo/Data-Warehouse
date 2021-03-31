const { Regiones, Paises, Ciudad } = require('../models');

//REGIONES

async function nuevaRegion(req, res){
    const regionName = req.body.regionName;
    Regiones.create({
        name: regionName
    })
        .then(data => {
            res.status(200).json({
                msg: 'Región creada',
                data: data,
                status: 200
            })
        })
        .catch(err => {
            res.status(400).json({
                msg: 'Ocurrió un error, intente mas tarde.',
                error: err,
                status: 400
            })
        })
}

async function buscarRegionesJSON(req, res){
    Regiones.findAll()
        .then(data => {
            res.status(200).json({
                msg: 'Regiones',
                data: data,
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

async function buscarRegiones(req, res){
    Regiones.findAll({
        include: {
            all: true,
            nested: true
        }
    })
        .then(data => {
            //console.log(JSON.stringify(data, null, 2));
            res.status(200).render('home', {
                title: 'Region/Ciudad',
                data: data,
                status: 200
            })
        })
        .catch(err => {
            res.status(400).json({
                msg: 'Ocurrió un error, intente mas tarde.',
                data: err,
                status: 400
            })
        })
}

async function borrarRegion(req, res){
    const id = req.body.id;
    Regiones.findByPk(id)
        .then(region => {
            region.destroy();
            res.status(200).json({
                msg: 'Region borrada',
                data: region,
                status: 200
            })
        })
        .catch(err => {
            res.status(400).json({
                msg: 'ID Region inexistente',
                data: err,
                status: 400
            })
        })
}

async function editarRegion(req, res){
    const id = req.body.id;
    const regionName = req.body.name;
    Regiones.findByPk(id)
        .then(region => {
            region.name = regionName;
            region.save();
            res.status(200).json({
                msg: 'Región actualizada',
                data: region,
                status: 200
            })
        })
        .catch(err => {
            res.status(400).json({
                msg: 'ID Región inexistente',
                data: err,
                status: 400
            })
        })
}

//PAISES

async function nuevoPais(req, res){
    const regionId = parseInt(req.body.regionId);
    const countryName = req.body.countryName;
    Paises.create({
        name: countryName,
        regionId: regionId
    })
        .then(data => {
            res.status(200).json({
                msg: 'Pais creado',
                data: data,
                status: 200
            })
        })
        .catch(err => {
            res.status(400).json({
                msg: 'Ocurrió un error, intente mas tarde.',
                error: err,
                status: 400
            })
        })
}

async function borrarPais(req, res){
    const id = req.body.id;
    Paises.findByPk(id)
        .then(country => {
            country.destroy();
            res.status(200).json({
                msg: 'País Eliminado',
                data: country,
                status: 200
            })
        })
        .catch(err => {
            res.status(400).json({
                msg: 'ID País inexistente',
                data: err,
                status: 400
            })
        })
}

async function editarPais(req, res){
    const id = req.body.id;
    const countryName = req.body.name;
    Paises.findByPk(id)
        .then(country => {
            country.name = countryName;
            country.save();
            res.status(200).json({
                msg: 'País Actualizado',
                data: country,
                status: 200
            })
        })
        .catch(err => {
            res.status(400).json({
                msg: 'ID País inexistente',
                data: err,
                status: 400
            })
        })
}

async function buscarPaises(req, res){
    const regionId = req.body.regionId;
    Paises.findAll({
        where: {
            regionId: regionId
        }
    })
        .then(countries => {
            res.status(200).json({
                msg: 'Países según region Id',
                data: countries,
                status: 200
            })
        })
        .catch(err => {
            res.status(400).json({
                msg: 'ID Región inexistente',
                data: err,
                status: 400
            })
        })
}

//CIUDADES

async function nuevaCiudad(req, res){
    const countryId = parseInt(req.body.countryId);
    const cityName = req.body.cityName;
    Ciudad.create({
        name: cityName,
        countryId: countryId
    })
        .then(data => {
            res.status(200).json({
                msg: 'Ciudad creada',
                data: data,
                status: 200
            })
        })
        .catch(err => {
            res.status(400).json({
                msg: 'Ocurrió un error, intente mas tarde.',
                data: err,
                status: 400
            })
        })
}

async function borrarCiudad(req, res){
    const id = req.body.id;
    Ciudad.findByPk(id)
        .then(city => {
            city.destroy();
            res.status(200).json({
                msg: 'Ciudad Eliminada',
                data: city,
                status: 200
            })
        })
        .catch(err => {
            res.status(400).json({
                msg: 'ID Ciudad inexistente',
                data: err,
                status: 400
            })
        })
}

async function editarCiudad(req, res){
    const id = req.body.id;
    const cityName = req.body.name;
    Ciudad.findByPk(id)
        .then(city => {
            city.name = cityName;
            city.save();
            res.status(200).json({
                msg: 'Ciudad Actualzada',
                data: city,
                status: 200
            })
        })
        .catch(err => {
            res.status(400).json({
                msg: 'ID Ciudad inexistente',
                data: err,
                status: 400
            })
        })
}

async function buscarCiudades(req, res){
    const countryId = req.body.countryId;
    Ciudad.findAll({
        where: {
            countryId: countryId
        }
    })
        .then(cities => {
            res.status(200).json({
                msg: 'Ciudades según Country ID',
                data: cities,
                status: 200
            })
        })
        .catch(err => {
            res.status(400).json({
                msg: 'ID de País inexistente',
                data: err,
                status: 400
            })
        })
}

module.exports = {
    nuevaRegion,
    buscarRegiones,
    buscarRegionesJSON,
    borrarRegion,
    editarRegion,
    nuevoPais,
    buscarPaises,
    editarPais,
    borrarPais,
    nuevaCiudad,
    buscarCiudades,
    editarCiudad,
    borrarCiudad
}