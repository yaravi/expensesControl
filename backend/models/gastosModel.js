const mongoose = require ('mongoose')

// CREATE SCHEMA
const gastosSchema = mongoose.Schema ({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // referencia el modelo creado en userModel.js
    },
    cantidad: {
        type: Number,
        required: [true, 'Please type cantidad']
    },
    tipo: {
        type: String,
        required: [true, 'Please type tipo']
    },
    text: {
        type: String,
        required: [true, 'Please type descripción']
    }
}, {
    timestamps: true, // Create createdAt & updatedAt 
})

module.exports = mongoose.model('Gasto', gastosSchema)