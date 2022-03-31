// Import express async handler
const asyncHandler = require('express-async-handler')
// Import DB schema into controller
const Gasto = require ('../models/gastosModel')
// CRUD FUNCTIONS
//-------------------------------- READ
const getGastos = asyncHandler(async (req, res) => {
    const gastos = await Gasto.find({ user: req.user.id });
    res.status(200).json(gastos);
});
//-------------------------------- CREATE
const postGastos = asyncHandler (async(req,res) => {
    if (!req.body.text) {
        //res.status(400).json({message: '400 Bad request, format empty'})
        res.status(400)
        throw new Error('Need valid format')
    }
    const gasto = await Gasto.create({
        text: req.body.text,
        cantidad: req.body.cantidad,
        tipo: req.body.tipo,
        user: req.user.id
    })
    //console.log(req.body)
    res.status(200).json(gasto)

});
//-------------------------------- UPDATE
const putGastos = asyncHandler (async(req,res) => {
    const gasto = await Gasto.findById(req.params.id)
    // Set ID validation
    if (!gasto) {
        res.status(400)
        throw new Error ('Yo need to have a valid ID')
    }
    // If ID is valid then modify
    if (gasto.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Acceso No Autorizado')
    }
    const gastoUpdated = await Tarea.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    res.status(200).json(gastoUpdated)
})
//-------------------------------- DELETE
const deleteGastos = asyncHandler (async(req,res) => {
    const gasto = await Gasto.findById(req.params.id)
    // Set ID validation
    if (!gasto) {
        res.status(400)
        throw new Error ('Yo need to have a valid ID')
    }
    // If ID is valid then modify
    if (gasto.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Acceso No Autorizado')
    }
    await gasto.remove()
    res.status(200).json({ id: req.params.id })
})
// Export router route
module.exports = {
    getGastos,
    postGastos,
    putGastos,
    deleteGastos,
}