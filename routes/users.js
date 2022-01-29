import express, { request, response } from 'express';
import { addUsers, findUsername, genPassword } from '../helper.js';

const router = express.Router();

// app.use(express.json()) -- middleware

// Post method to add movie
router.post('/signup', express.json(), async (request, response) => {
	const { username, password } = request.body;
	// console.log('incoming', password, username);
	const passwordTester = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})');
	const strength = passwordTester.test(password);

	if (strength) {
		const checkUsername = await findUsername({ username: username });

		const hashedPassword = await genPassword(password);
		const result =
			checkUsername.length > 0
				? ''
				: await addUsers({ username: username, password: hashedPassword });

		checkUsername.length > 0 ? response.send('Username already taken') : response.send(result);
	} else {
		response.send(
			'Please make sure password contains a Uppercase, a lowercase, a special character and a number with a minimum of 8 characters'
		);
	}
});

export const usersRouter = router;
