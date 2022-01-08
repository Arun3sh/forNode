import { client } from './index.js';

async function searchMovieById(id) {
	return await client.db('mern').collection('movies').findOne({ id: id });
}

async function updateMovieRatingById(id, updatedMovie) {
	return await client.db('mern').collection('movies').updateOne({ id: id }, { $set: updatedMovie });
}

async function deleteMovieById(id) {
	await client.db('mern').collection('movies').deleteOne({ id: id });
}

async function addMovies(data) {
	return await client.db('mern').collection('movies').insertMany(data);
}

async function findMovies(filter) {
	return await client.db('mern').collection('movies').find(filter).toArray();
}

export { searchMovieById, updateMovieRatingById, deleteMovieById, addMovies, findMovies };
