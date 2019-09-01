'use strict'

const express = require('express')
const MoviesService = require('../services/movies')
const {
    movieIdSchema,
    createMovieSchema,
    updateMovieSchema
} = require('../utils/schemas/movies')

const validationsHandler = require('../utils/middleware/validationsHandler')

function moviesApi(app) {
    const router = express.Router();
    app.use('/api/movies', router)

    const movieService = new MoviesService()

    router.get('/', async function (req, res, next) {
        const { tags } = req.query;
        try {
            const movies = await movieService.getMovies({ tags })

            res.status(200).json({
                data: movies,
                message: 'movies listed'
            })
        } catch (error) {
            next(error)
        }
    })

    router.get('/:movieId', validationsHandler({ movieId: movieIdSchema }, 'params'), async function (req, res, next) {
        const { movieId } = req.params
        try {
            const movie = await movieService.getMovie({ movieId })

            res.status(200).json({
                data: movie,
                message: 'movies retrieved'
            })
        } catch (error) {
            next(error)
        }
    })

    router.post('/', validationsHandler(createMovieSchema), async function (req, res, next) {
        const { body: movie } = req;
        try {
            const createMovies = await movieService.createMovie({ movie })

            res.status(201).json({
                data: createMovies,
                message: 'movies created'
            })
        } catch (error) {
            next(error)
        }
    })

    router.put('/:movieId', validationsHandler({ movieId: movieIdSchema }, 'params'), validationsHandler(updateMovieSchema), async function (req, res, next) {
        const { body: movie } = req
        const { movieId } = req.params
        try {
            const updatedMovieId = await movieService.updateMovie({ movieId, movie })

            res.status(200).json({
                data: updatedMovieId,
                message: 'movies updated'
            })
        } catch (error) {
            next(error)
        }
    })

    router.delete('/:movieId', validationsHandler({ movieId: movieIdSchema }, 'params'), async function (req, res, next) {
        const { movieId } = req.params
        try {
            const deletedMovieId = await movieService.deleteMovie({ movieId })

            res.status(200).json({
                data: deletedMovieId,
                message: 'movies deleted'
            })
        } catch (error) {
            next(error)
        }
    })
}

module.exports = moviesApi