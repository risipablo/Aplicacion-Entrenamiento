const express = require('express');
const connectDB = require('./config/dataBase');
const cors = require('cors');
require('dotenv').config();

const swinRoutes = require('./routes/swinRoutes');
const errorHandler = require('./middleware/errorMiddleware');

const app = express();

connectDB();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
}));



app.use('/api', swinRoutes);
app.use(errorHandler);

app.listen(3001, () => {
    console.log('Servidor corriendo en el puerto 3001');
});