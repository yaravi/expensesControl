// Load express library
const express = require('express');
// Needed to manage routes in express
const router = express.Router(); 
const {getGastos, postGastos, putGastos, deleteGastos} = require('../controllers/gastoControllers');
// Import protect from authMiddleware where protect function is created
const { protect } = require('../middleware/authMiddleware') 
// ------------------------------------------------------------------------------
router.route('/').get(protect, getGastos).post(protect, postGastos)
router.route('/:id').delete(protect, deleteGastos).put(protect, putGastos)
// Export router
module.exports = router;