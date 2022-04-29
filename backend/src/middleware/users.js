import { usersDatabaseMethods } from '../database/users';
import { throwError, generateToken } from '../utils';

require('dotenv').config();
const bcrypt = require('bcryptjs');

const signUpUser = async (data) => {
	const { email, userName, password, employerId } = data;
	const [checkUser] = await usersDatabaseMethods.dbFetchUser(email);
	console.log(checkUser, 'userdoc');
	if (checkUser) {
		throwError(400, 'User already exists please login');
	}
	const user = {
		email,
		name: userName,
		password,
		employerId,
		signUpDate: new Date(),
		type: 'employerDoc',
	};
	user.password = await bcrypt.hash(password, 10);
	try {
		await usersDatabaseMethods.dbCreateUser(user);
	} catch (err) {
		console.log(err);
		throwError('400', 'User already registered');
	}
	return {
		email,
		password,
	};
};

const login = async (data) => {
	const { email, password } = data;
	const [checkUser] = await usersDatabaseMethods.dbFetchUser(email);
	console.log(checkUser, 'userdoc');
	if (!checkUser) {
		throwError(400, 'Invalid user email, please signup or enter an existing email');
	}
	const checkPass = await bcrypt.compare(password, checkUser.password);
	if (!checkPass) {
		throwError(400, 'Invalid password, please enter the correct one');
	}
	const payload = {
		email,
		purpose: 'login',
		name: checkUser.name,
	};
	const expiry = '10h';
	const token = generateToken(payload, expiry);
	return {
		message: 'success',
		token,
	};
};

const userMiddleware = {
	signUpUser,
	login,
};
export { userMiddleware };
