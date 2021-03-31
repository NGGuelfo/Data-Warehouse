const bcrypt = require('bcryptjs');

const Usuarios = require('../models');


const {
    jwt,
    firma
} = require('../models');


async function crearUsuario(req, res){
    const newName = req.body.name;
    const newLastName = req.body.lastname;
    const newEmail = req.body.email;
    const newAdmin = req.body.perfil;
    const newPassword = req.body.password;
    Usuarios.findOne({
        where: {
            email: newEmail
        }
    })
        .then(usuario => {
            if (usuario) {
                return res.status(400).send({
                    msg: 'Email existente!',
                    user: usuario,
                    status: 400
                });
            } else {
                return bcrypt
                    .hash(newPassword, 12)
                    .then(hashedPassword => {
                        const user = new Usuarios({
                            name: newName,
                            lastname: newLastName,
                            email: newEmail,
                            admin: newAdmin,
                            password: hashedPassword
                        });
                        return user.save();
                    })
            }
        })
        .then(data => {
            return res.status(200).send({
                msg: 'Usuario creado!',
                user: data,
                status: 200
            });
        })
        .catch(err => {
            return res.status(400).send({
                msg: 'Ocurrio un error, intente nuevamente',
                data: err,
                status: 400
            });
        })
}

async function loginUsuario(req, res){
    const email = req.body.email;
    const password = req.body.password;
    var usuarioLog;
    Usuarios.findOne({
        where: {
            email: email
        }
    })
        .then(user => {
            usuarioLog = user;
            console.log(user);
            if (!user) {
                return res.status(400).send('Email / usuario inexistente.');
            }
            bcrypt.compare(password, user.password)
                .then(doMatch => {
                    if (doMatch) {
                        var userData = usuarioLog.dataValues;
                        const token = jwt.sign({
                            userData
                        }, firma);
                        return res.status(200).json({
                            msg: 'Usuario logueado!',
                            usuario: usuarioLog.dataValues.email,
                            token: token,
                            admin: usuarioLog.dataValues.admin
                        });
                    } else {
                        return res.status(400).send('Contraseña incorrecta.');
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        })
}

async function verUsuarios(req, res){
    Usuarios.findAll()
        .then(data => {
            console.log(JSON.stringify(data, null, 2));
            res.status(200).render('home', {
                title: 'Usuarios',
                data: data,
                status: 200
            });
        })
        .catch(err => {
            res.status(400).send('Error 404, no existen usuarios.' + err);
        })
}

async function editarUsuarios(req, res){
    const id = req.body.id;
    const newName = req.body.name;
    const newLastName = req.body.lastname;
    const newEmail = req.body.email;
    const newAdmin = req.body.perfil;
    const newPassword = req.body.password;
    const saltRounds = 12;
    Usuarios.findByPk(id)
        .then(user => {
            console.log(user);
            user.name = newName;
            user.lastname = newLastName;
            user.email = newEmail;
            user.admin = newAdmin;
            bcrypt.hash(newPassword, saltRounds, (err, hash) => {
                user.password = hash;
            })
            user.save();
            console.log(user);
            res.status(200).send({
                msg: 'Usuario actualizado!',
                user: user,
                status: 200
            });
        })
        .catch(err => {
            res.status(400).json({
                msg: 'ID erróneo o inexistente',
                data: err,
                status: 400
            })
        })
}

async function borrarUsuarios(req, res){
    const id = req.body.id;
    Usuarios.findByPk(id)
        .then(user => {
            console.log(user);
            user.destroy();
            res.status(200).json({
                msg: 'Usuario eliminado',
                data: user,
                status: 200
            })
        })
        .catch(err => {
            res.status(400).json({
                msg: 'ID usuario inexistente o erróneo.',
                data: err,
                status: 400
            })
        })
}

module.exports = {
    crearUsuario,
    loginUsuario,
    verUsuarios,
    editarUsuarios,
    borrarUsuarios
}