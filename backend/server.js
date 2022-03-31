// Load dotenv Library
const dotenv = require('dotenv').config();
// CORS library
const cors = require ('cors');
// Error handler module
const {errorHandler} = require ('./middleware/errorMiddleware')
// Import DB.JS MongoDB connection
const {connectDB} = require ('./config/db')
// Load express library
const express = require('express');
const port = process.env.PORT;

// Call connectDB function
connectDB(); //conectar a la db con lo que trae del archivo config/db

// Create express application
const app = express();
// Usar CORS
app.use(cors())
// Middleware to have JSON method access
app.use(express.json())
// Middleware to use body urlencode 
app.use(express.urlencoded({extended:false}))
// Import route from tareaRoutes.js
app.use('/api/gastos', require('./routes/gastosRoutes'))
app.use('/api/users', require('./routes/userRoutes'))
// Use the error handler module from errorHandler
app.use(errorHandler)
// Express start listening on port defined
app.listen(port, ()=>console.log(`El servidor inició en el puerto ${port}`))