//-------------------------------- LIBRARIES
const jwt = require ('jsonwebtoken');
const bcrypt = require ('bcryptjs');
const asyncHandler = require('express-async-handler')
const User = require ('../models/userModel');
//-------------------------------- REGISTER USER
const registerUser = asyncHandler (async (req,res) => {
    // Destructurar los datos del request.body
    const {name,email,password} = req.body
    // Verificar que el body contenga todos los datos solicitados {name, email, password}
    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Data is missing {name, email, password}');
    };
    // Verificar que no exista el usuario por medio del atribto unico Email
    const userExists = await User.findOne({ email }) // Se pasa email de la destructuracion
    if (userExists) {
        res.status(400);
        throw new Error ('User already exists in database');
    };
    // PASSWORD ENCRYPTION
    const salt = await bcrypt.genSalt(10); // Numero de rondas para generar el hash
    const hashedPassword = await bcrypt.hash(password,salt); // Se aplica el algoritmo hash al password
    // Despues de las validaciones se crea el usuario 
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });
    // mostrar si el usuario fue creado exitosamente o no
    if (user) {
        res.status(201).json({
            id: user.id,
            name: user.name,
            email: user.email,
        });
    } else {
        res.status(400);
        throw new Error ('Data is not valid');
    };
});
//-------------------------------- LOGIN USER
const loginUser = asyncHandler (async (req,res) => {
    // Destructurar los datos del request.body
    const {name,email,password} = req.body;
    // Verify if email exists
    const user = await User.findOne({email});
    // If user exists compare password with hashedPassword
    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json ({
            id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id),
        });
    } else {
        res.status(400);
        throw new Error ('Password is incorrect');
    };
});
//-------------------------------- USER PROFILE
const perfilUser = asyncHandler (async(req,res) => {
    //Destructuracion de req.user que viene del authMiddelware en protect. Trae toda la info de usuario menos password
    const { id, name, email } = req.user

    res.status(200).json({
        id,
        name,
        email
    });
});
//-------------------------------- TOKEN GENERATION
const generateToken = (id) => {
    return jwt.sign({ id },process.env.JWT_SECRET, { // jwt.sign parametros: payload, secret y tiempo de expiración
        expiresIn: '30d',
    });
};
//-------------------------------- EXPORT MODULES
module.exports = {
    registerUser,
    loginUser,
    perfilUser,
    generateToken,
}