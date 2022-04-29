import express from 'express';
import { employeeMiddleware } from '../middleware/employee';
import { handleError } from '../utils';

const router = express.Router();

router.get('/fetchAllEmployees', async (req, res, next) => {
	try {
		res.status(200).send({ message: 'success', obj: await employeeMiddleware.fetchAllEmployees() });
	} catch (err) {
		handleError(err, next);
	}
});

router.post('/deleteEmployee', async (req, res, next) => {
	try {
		const { employeeId } = req.body;
		res.status(200).send({ message: 'success', obj: await employeeMiddleware.deleteEmployee(employeeId) });
	} catch (err) {
		handleError(err, next);
	}
});
router.post('/createEmployee', async (req, res, next) => {
	try {
		res.status(200).send({ message: 'success', obj: await employeeMiddleware.createEmployee(req.body) });
	} catch (err) {
		handleError(err, next);
	}
});
router.get('/fetchEmployeeWithId', async (req, res, next) => {
	try {
		const { id } = req.query;
		res.status(200).send({ message: 'success', obj: await employeeMiddleware.fetchEmployee(id) });
	} catch (err) {
		handleError(err, next);
	}
});
router.post('/updateEmployeeDetails', async (req, res, next) => {
	try {
		res.status(200).send({ message: 'success', obj: await employeeMiddleware.updateEmployee(req.body) });
	} catch (err) {
		handleError(err, next);
	}
});

export { router };
