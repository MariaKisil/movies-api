const express = require('express');
const {ValidationError} = require('sequelize');

const sequelize = require('./config/db');
const apiRoutes = require('./routes/apiRoutes');


const app = express();
app.use(express.json());

app.use(apiRoutes);

app.use((err, req, res) => {
    console.error(err.stack);
    if (err instanceof ValidationError) {
        return res.status(400).json({message: 'Validation error', errors: err.errors.map(e => e.message)});
    }
    res.status(500).json({message: 'Server error'});
});

sequelize.sync().then(() => {
    app.listen(3000, () => console.log('Server started on port 3000'));
});
