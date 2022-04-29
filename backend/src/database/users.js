import { connectToDatabase } from '../config/database';
import { Employer } from '../models/models';

const dbFetchUser = async (data) => {
	console.log('data', data);
	await connectToDatabase();
	const employerDoc = await Employer.find({ email: data });
	return employerDoc;
};

const dbCreateUser = async (data) => {
	const employerConfig = new Employer(data);
	await connectToDatabase();
	await employerConfig.save();
};

const usersDatabaseMethods = {
	dbFetchUser,
	dbCreateUser,
};
export { usersDatabaseMethods };
