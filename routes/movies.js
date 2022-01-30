import express, { request, response } from 'express';
import {
	searchMovieById,
	updateMovieRatingById,
	deleteMovieById,
	addMovies,
	findMovies,
} from '../helper.js';
import cors from 'cors';

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
router.post('/', cors, async (request, response) => {
	const data = request.body;
	// console.log('incoming', data);
	const result = await addMovies(data);

	response.send(result);
});

// Delete method
router.delete('/:id', async (request, response) => {
	const { _id } = request.params;
	const movie = await deleteMovieById(_id);

	response.send(movie);
	// console.log(movie);
	// movie ? response.send(movie) : response.send({ msg: 'Deleted Successfully' });
});

// Update rating with movie id
router.put('/:id', express.json(), async (request, response) => {
	const { _id } = request.params;
	const updatedMovie = request.body;

	const update = await updateMovieRatingById(_id, updatedMovie);

	response.send(update);
});

// Movie with id - Mongo connected
router.get('/:id', async (request, response) => {
	const { _id } = request.params;

	const movie = await searchMovieById(_id);
	console.log(movie);
	movie ? response.send(movie) : response.send({ msg: 'Movie not found' });
});

export const moviesRouter = router;
