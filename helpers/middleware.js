const jwt = require('jsonwebtoken');


// JWT verification middleware
const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(403).json({message: 'Forbidden'});
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({message: 'Forbidden'});
        req.user = user;
        next();
    });
};

// Movie validation middleware
const validateMovie = (req, res, next) => {
    const {title, director, releaseYear, genre, rating} = req.body;
    const errors = [];
    if (!title) errors.push('Title is required');
    if (!director) errors.push('Director is required');
    if (!releaseYear || typeof releaseYear !== 'number') errors.push('Release Year is required and must be a number');
    if (!genre) errors.push('Genre is required');
    if (typeof rating !== 'number') errors.push('Rating must be a number');
    if (errors.length) return res.status(400).json({message: 'Validation error', errors});
    next();
};

module.exports = {authenticateJWT, validateMovie};