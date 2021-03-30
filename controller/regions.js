const {Region, Country, City} = require('../models');

exports.postNewRegion = (req, res, next) => {
    const regionName = req.body.regionName;
    Region.create({
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

exports.postNewCountry = (req, res, next) => {
    const regionId = parseInt(req.body.regionId);
    const countryName = req.body.countryName;
    Country.create({
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

exports.postNewCity = (req, res, next) => {
    const countryId = parseInt(req.body.countryId);
    const cityName = req.body.cityName;
    City.create({
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

exports.allRegionsJSON = (req, res, next) => {
    Region.findAll()
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

exports.allRegions = (req, res, next) => {
    Region.findAll({
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

exports.deleteRegion = (req, res, next) => {
    const id = req.body.id;
    Region.findByPk(id)
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

exports.updateRegion = (req, res, next) => {
    const id = req.body.id;
    const regionName = req.body.name;
    Region.findByPk(id)
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

exports.deleteCountry = (req, res, next) => {
    const id = req.body.id;
    Country.findByPk(id)
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

exports.updateCountry = (req, res, next) => {
    const id = req.body.id;
    const countryName = req.body.name;
    Country.findByPk(id)
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

exports.deleteCity = (req, res, next) => {
    const id = req.body.id;
    City.findByPk(id)
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

exports.updateCity = (req, res, next) => {
    const id = req.body.id;
    const cityName = req.body.name;
    City.findByPk(id)
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

exports.getCountries = (req, res, next) => {
    const regionId = req.body.regionId;
    Country.findAll({
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

exports.getCities = (req, res, next) => {
    const countryId = req.body.countryId;
    City.findAll({
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