const {Router} = require('express');

const Movie = require("../models/movie");
const handleNotFound = require("../helpers/error-handler");
const {authenticateJWT, validateMovie} = require("../helpers/middleware");


const moviesRouter = Router();

moviesRouter.get('/', async (req, res) => {
    try {
        const movies = await Movie.findAll();
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({message: 'Server error'});
    }
});

moviesRouter.get('/:id', async (req, res) => {
    try {
        const movie = await Movie.findByPk(req.params.id);
        if (!movie) return handleNotFound(res, 'Movie');
        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json({message: 'Server error'});
    }
});

moviesRouter.post('/', authenticateJWT, validateMovie, async (req, res) => {
    try {
        const {title} = req.body;
        const existingMovie = await Movie.findOne({where: {title}});
        //we can't add here 404 because there's no scenario where there would be no movie found
        if (existingMovie) {
            return res.status(409).json({message: 'Movie title already exists'});
        }
        const newMovie = await Movie.create(req.body);
        res.status(201).json(newMovie);
    } catch (error) {
        res.status(500).json({message: 'Server error'});
    }
});

moviesRouter.put('/:id', authenticateJWT, validateMovie, async (req, res) => {
    try {
        const movie = await Movie.findByPk(req.params.id);
        if (!movie) return handleNotFound(res, 'Movie');    
        const {title} = req.body;
        const existingMovie = await Movie.findOne({where: {title}});
        if (existingMovie && existingMovie.id !== movie.id) {
            return res.status(409).json({message: 'Movie title already exists'});
        }
        await movie.update(req.body);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({message: 'Server error'});
    }
});

moviesRouter.delete('/:id', authenticateJWT, async (req, res) => {
    try {
        const movie = await Movie.findByPk(req.params.id);
        if (!movie) return handleNotFound(res, 'Movie');
        await movie.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({message: 'Server error'});
    }
});


module.exports = moviesRouter;