import { client } from './index.js';
import bcrypt from 'bcrypt';

async function searchMovieById(_id) {
	return await client.db('mern').collection('movies').findOne({ _id: _id });
}

async function updateMovieRatingById(_id, updatedMovie) {
	return await client
		.db('mern')
		.collection('movies')
		.updateOne({ _id: _id }, { $set: updatedMovie });
}

async function deleteMovieById(_id) {
	await client.db('mern').collection('movies').deleteOne({ _id: _id });
}

async function addMovies(data) {
	return await client.db('mern').collection('movies').insertMany(data);
}

async function findMovies(filter) {
	return await client.db('mern').collection('movies').find(filter).toArray();
}

async function addUsers(data) {
	return await client.db('mern').collection('users').insertOne(data);
}

async function findUsername(filter) {
	return await client.db('mern').collection('users').findOne(filter);
}

async function genPassword(password) {
	const salt = await bcrypt.genSalt(10);
	console.log('salt', salt);

	const hashedPassword = await bcrypt.hash(password, salt);
	console.log(hashedPassword);
	return hashedPassword;
}

export {
	searchMovieById,
	updateMovieRatingById,
	deleteMovieById,
	addMovies,
	findMovies,
	addUsers,
	findUsername,
	genPassword,
};
