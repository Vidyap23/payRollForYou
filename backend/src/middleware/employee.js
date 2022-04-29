import { employeesDatabaseMethods } from '../database/employees';
import { throwError } from '../utils';

require('dotenv').config();

const fetchAllEmployees = async () => {
	try {
		const employeesDoc = await employeesDatabaseMethods.dbFetchEmployees();
		return employeesDoc;
	} catch (err) {
		throwError(400, 'Some error occured while fetching the employees');
	}
};
const fetchEmployee = async (employeeId) => {
	try {
		const [employeeDoc] = await employeesDatabaseMethods.dbFetchEmployeeWithId(employeeId);
		return employeeDoc;
	} catch (err) {
		throwError(400, 'Some error occured while fetching the employee');
	}
};

const deleteEmployee = async (employeeId) => {
	try {
		console.log(employeeId);
		const [employeeDoc] = await employeesDatabaseMethods.dbFetchEmployeeWithId(employeeId);
		// eslint-disable-next-line no-underscore-dangle
		console.log(employeeDoc);
		await employeesDatabaseMethods.dbDeleteEmployeeWithId(employeeDoc._id);
		return {
			message: 'Employee succesfully deleted',
		};
	} catch (err) {
		console.log(err);
		throwError(400, 'Some error occured while fetching the employee');
	}
};

const updateEmployee = async (doc) => {
	try {
		const { employeeId } = doc;
		const [employeeDoc] = await employeesDatabaseMethods.dbFetchEmployeeWithId(employeeId);
		// eslint-disable-next-line no-underscore-dangle
		await employeesDatabaseMethods.dbUpdateEmployeeWithId(employeeDoc._id, doc);
		return {
			message: 'Employee succesfully updated',
		};
	} catch (err) {
		console.log(err);
		throwError(400, 'Some error occured while fetching the employee');
	}
};

const createEmployee = async (data) => {
	try {
		console.log(data, 'data');
		const [checkEmployee] = await employeesDatabaseMethods.dbFetchEmployeeWithId(data.employeeId);
		if (checkEmployee) {
			throwError(400, 'Cannot create a duplicate employee with same id and email');
		}
		data.type = 'employeeDoc';
		data.createdDate = new Date();
		const createdEmployeeDoc = await employeesDatabaseMethods.dbCreateEmployee(data);
		return createdEmployeeDoc;
	} catch (err) {
		console.log(err);
		throwError(400, 'Some error occured while fetching the employees');
	}
};

const employeeMiddleware = {
	fetchAllEmployees,
	createEmployee,
	fetchEmployee,
	deleteEmployee,
	updateEmployee,
};
export { employeeMiddleware };
