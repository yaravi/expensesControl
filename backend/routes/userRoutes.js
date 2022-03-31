// Load express library
const express = require('express');
const router = express.Router(); // Needed to manage routes in express
// Import controllers
const {registerUser, loginUser, perfilUser} = require ('../controllers/userControllers');
// Import protect function
const { protect } = require('../middleware/authMiddleware') // Import protect from authMiddleware where protect function is created
// ------------------------------------------------------------------------------
// CREATE ROUTES
// REGISTER A USER
router.post('/', registerUser); //regsitrar un usuario, el segundo parámetro es el controlador
// LOGIN USER
router.post('/login', loginUser); //loggear user
// PROFILE ROUTE
router.get('/profile', protect, perfilUser); //traer los datos del usuario, con protect está protegido. Se pone en ese orden por orden de ejecución
// ------------------------------------------------------------------------------
// EXPORT MODULES
module.exports = router;