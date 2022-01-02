// For express
// const { response } = require('express');
// const express = require('express');
// const { request } = require('http');
import express, { request, response } from 'express';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

// const PORT = 9000;
const PORT = process.env.PORT;

// const MONGO_URL = 'mongodb://localhost';
const MONGO_URL = process.env.MONGO_URL;

async function createConnection() {
	const client = new MongoClient(MONGO_URL);
	await client.connect();
	console.log('mongo');
	return client;
}

const client = await createConnection();

app.get('/', (request, response) => {
	response.send('Hello 🌏 heroku');
});

// Movie with query string

// app.get('/movies', (request, response) => {
// 	let inp = request.query;

// 	if (inp.language && inp.rating) {
// 		const res = movies.filter((e) => e.language === inp.language && e.rating === +inp.rating);

// 		res.length ? response.send(res) : response.send('Movie not Found');
// 	} else if (inp.rating) {
// 		const rating = movies.filter((e) => e.rating === +inp.rating);

// 		rating.length ? response.send(rating) : response.send('Movie not Found');
// 	} else if (inp.language) {
// 		const lang = movies.filter((e) => e.language === inp.language);

// 		lang.length ? response.send(lang) : response.send('Movie not Found');
// 	} else {
// 		response.send(movies);
// 	}
// });

// app.get('/movies', (request, response) => {
// 	const { language, rating } = request.query;
// 	let filteredMovies = movies;
// 	if (language || rating) {
// 		rating && language
// 			? response.send(filteredMovies.filter((e) => e.language === language && e.rating === +rating))
// 			: rating
// 			? response.send(movies.filter((e) => e.rating === +rating))
// 			: language
// 			? response.send(filteredMovies.filter((e) => e.language === language))
// 			: response.send('Movie not Found');
// 		//response.send(filteredMovies.filter((e) => e.language === language))
// 		return;
// 	}
// 	response.send(movies);
// });

// Movie with id without mongo
// app.get('/movies/:id', (request, response) => {
// 	const { id } = request.params;
// 	const res = movies.find((e) => e.id == id);

// 	res ? response.send(res) : response.send('Movie not Found');
// });

// Movie with query - mongo connected
app.get('/movies', async (request, response) => {
	const filter = request.query;
	if (filter.rating) {
		filter.rating = +filter.rating;
	}

	const movies = await client.db('mern').collection('movies').find(filter).toArray();
	response.send(movies);
});
// app.use(express.json()) -- middleware
// Post method to add movie
app.post('/movies', express.json(), async (request, response) => {
	const data = request.body;
	console.log('incoming', data);
	const result = await client.db('mern').collection('movies').insertMany(data);

	response.send(result);
});

// Delete method
app.delete('/movies/delete/:id', async (request, response) => {
	const { id } = request.params;
	const deleteMovie = await client.db('mern').collection('movies').deleteOne({ id: id });
	//deleteMovie.deletedCount ? response.send(client.db('mern').collection('movies').find({})) : '';
	response.send(deleteMovie);
});

// Update rating with movie id
app.put('/movies/update/:id', async (request, response) => {
	const { id } = request.params;
	const { language, rating } = request.query;
	console.log(rating);
	const update = await client
		.db('mern')
		.collection('movies')
		.updateOne({ id: id }, { $set: { rating: +rating } });

	response.send(update);
});

// Movie with id - Mongo connected
app.get('/movies/:id', async (request, response) => {
	const { id } = request.params;

	const movie = await client.db('mern').collection('movies').findOne({ id: id });
	console.log(movie);
	movie ? response.send(movie) : response.send({ msg: 'Movie not found' });
});
app.listen(PORT, () => console.log('The server started', PORT));
