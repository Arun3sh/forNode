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

const PORT = process.env.PORT;

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

app.listen(PORT, () => console.log('The server started', PORT));
