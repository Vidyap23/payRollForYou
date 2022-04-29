import express from 'express';
import { userMiddleware } from '../middleware/users';
import { handleError, throwError } from '../utils';
// eslint-disable-next-line import/named

const router = express.Router();

router.post('/login', async (req, res, next) => {
	try {
		res.status(200).send({ message: 'success', obj: await userMiddleware.login(req.body, res) });
	} catch (err) {
		handleError(err, next);
	}
});

router.post('/signUpUser', async (req, res, next) => {
	try {
		console.log(req.body);
		res.status(200).send({ message: 'success', obj: await userMiddleware.signUpUser(req.body) });
	} catch (err) {
		handleError(err, next);
	}
});

router.get('/logout', async (req, res, next) => {
	try {
		const result = await userMiddleware.logout(req, res);
		res.status(200).send({ message: 'success', obj: result });
	} catch (err) {
		handleError(err, next);
	}
});

export { router };
