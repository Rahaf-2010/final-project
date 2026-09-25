const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const app = express();
const sellRequestRoutes = require('./routes/sellRequestRoutes');
const carRoutes = require('./routes/carRoutes');


connectDB();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use('/api/auth', authRoutes);
app.use('/api/sell-requests', sellRequestRoutes);
app.use('/api/cars', carRoutes);
app.get('/api/status', (req, res) => {
    res.json({
        message: 'Issa Aoutomobile API läuft erfolgreich'
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server läuft auf Port ${PORT}`);
});

