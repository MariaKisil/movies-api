const {DataTypes} = require('sequelize');

const sequelize = require("../config/db");


const Movie = sequelize.define('Movie', {
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING},
    director: {type: DataTypes.STRING, allowNull: false},
    releaseYear: {type: DataTypes.INTEGER, allowNull: false},
    genre: {type: DataTypes.STRING, allowNull: false},
    rating: {type: DataTypes.FLOAT},
    duration: {type: DataTypes.INTEGER},
    language: {type: DataTypes.STRING},
    budget: {type: DataTypes.INTEGER},
    boxOffice: {type: DataTypes.INTEGER},
}, {timestamps: true});

module.exports = Movie;