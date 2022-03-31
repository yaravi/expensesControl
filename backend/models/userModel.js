const mongoose = require ('mongoose');
// CREATE DOCUMENT USER SCHEMA
const userSchema = mongoose.Schema({
    name: {
        type: 'string',
        required: [true, 'Please type a name']
    },
    email: {
        type: 'string',
        required: [true, 'Please type a valid email'],
        unique: true
    },
    password: {
        type: 'string',
        required: [true, 'Please type a password']
    },
    
}, {
    timestamps: true,
})

module.exports = mongoose.model('User', userSchema);