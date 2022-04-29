import { connectToDatabase } from '../config/database';
import { Employee } from '../models/models';

const dbFetchEmployees = async () => {
	await connectToDatabase();
	const employerDoc = await Employee.find();
	return employerDoc;
};

const dbFetchEmployeeWithId = async (employeeId) => {
	await connectToDatabase();
	const employerDoc = await Employee.find({ employeeId });
	return employerDoc;
};

const dbCreateEmployee = async (data) => {
	await connectToDatabase();
	const employeeConfig = new Employee(data);
	await employeeConfig.save();
};

const dbDeleteEmployeeWithId = async (documentId) => {
	await connectToDatabase();
	const res = await Employee.findOneAndDelete(documentId);
	return res;
};
const dbUpdateEmployeeWithId = async (id, updatedDocument) => {
	await connectToDatabase();
	const res = await Employee.replaceOne({ _id: id }, updatedDocument);
};
const employeesDatabaseMethods = {
	dbFetchEmployees,
	dbFetchEmployeeWithId,
	dbCreateEmployee,
	dbDeleteEmployeeWithId,
	dbUpdateEmployeeWithId,
};
export { employeesDatabaseMethods };
