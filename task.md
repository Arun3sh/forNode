import express, { request, response } from 'express';
import { MongoClient } from 'mongodb';

const app = express();

const PORT = 9000;

const MONGO_URL = 'mongodb://localhost';

async function createConnection() {
	const client = new MongoClient(MONGO_URL);
	await client.connect();
	console.log('mongo');
	return client;
}

const client = await createConnection();

// Post method to add movies
app.post('/movies', express.json(), async (request, response) => {
	const data = request.body;
	console.log('incoming', data);
	const result = await client.db('mern').collection('movies').insertMany(data);

	response.send(result);
});

// Delete method with id
app.delete('/movies/delete/:id', async (request, response) => {
	const { id } = request.params;
	const deleteMovie = await client.db('mern').collection('movies').deleteOne({ id: id });
	
	response.send(deleteMovie);
});

// Update rating with movie id where rating is passed as query
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
