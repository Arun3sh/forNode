import express, { request, response } from 'express';
import {
	searchMovieById,
	updateMovieRatingById,
	deleteMovieById,
	addMovies,
	findMovies,
} from '../helper.js';

const router = express.Router();

// Movie with query - mongo connected
router.get('/', async (request, response) => {
	const filter = request.query;
	if (filter.rating) {
		filter.rating = +filter.rating;
	}

	const movies = await findMovies(filter);
	response.send(movies);
});

// app.use(express.json()) -- middleware

// Post method to add movie
router.post('/', async (request, response) => {
	const data = request.body;

	const result = await addMovies(data);

	response.send(result);
});

// Delete method
router.delete('/:id', async (request, response) => {
	const { id } = request.params;

	const movie = await deleteMovieById(id);

	response.send(movie);
});

// Update rating with movie id
router.put('/:id', express.json(), async (request, response) => {
	const { id } = request.params;
	const updatedMovie = request.body;

	const update = await updateMovieRatingById(id, updatedMovie);

	response.send(update);
});

// Movie with id - Mongo connected
router.get('/:id', async (request, response) => {
	const { id } = request.params;

	const movie = await searchMovieById(id);

	movie ? response.send(movie) : response.send({ msg: 'Movie not found' });
});

export const moviesRouter = router;
