// For express
// const { response } = require('express');
// const express = require('express');
// const { request } = require('http');
import cors from 'cors';
import express, { request, response } from 'express';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import { moviesRouter } from './routes/movies.js';
import { usersRouter } from './routes/users.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
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

export const client = await createConnection();

app.get('/', (request, response) => {
	response.send('Hello 🌏 heroku');
});

app.use('/movies', moviesRouter);
app.use('/users', usersRouter);

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

app.listen(PORT, () => console.log('The server started', PORT));
