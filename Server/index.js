const express = require('express');
const connectDB = require('./config/dataBase');
const cors = require('cors');
require('dotenv').config();

const swinRoutes = require('./routes/swinRoutes');
const noteRoutes = require('./routes/notesRoutes')
const gymRoutes = require('./routes/gymRoutes')
const errorHandler = require('./middleware/errorMiddleware');

const app = express();

connectDB();
app.use(express.json());



const corsOptions = {
    origin: ['http://localhost:5173', 'https://aplicacion-entrenamiento.onrender.com',], 
     methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], 
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use('/api', swinRoutes);
app.use('/api', noteRoutes);
app.use('/api', gymRoutes);
app.use(errorHandler);


app.listen(3001, () => {
    console.log('Servidor corriendo en el puerto 3001');
});