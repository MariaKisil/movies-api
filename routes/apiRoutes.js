const {Router} = require('express');

const userRouter = require('./userRouter');
const moviesRouter = require('./moviesRouter');


const routes = Router();

routes.use('/user', userRouter);
routes.use('/movies', moviesRouter);

module.exports = routes;