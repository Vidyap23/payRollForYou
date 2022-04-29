import jwt from 'jsonwebtoken';
const throwError = (code, message) => {
	const error = new Error(message);
	error.code = code;
	throw error;
};
const handleError = (err, next) => {
	if (err.response) {
		const errorMessage = ((err.response || {}).data || {}).Message;
		// eslint-disable-next-line no-param-reassign
		err.message = errorMessage;
		// eslint-disable-next-line no-param-reassign
		err.code = 400;
	}
	// eslint-disable-next-line no-param-reassign
	if (!err.code) err.code = 500;
	// eslint-disable-next-line no-param-reassign
	if (!err.message) err.message = 'An error Occured';
	next(err);
};
const generateToken = (payload, expiry) =>
	jwt.sign(payload, process.env.JWT_SECRET, {
		expiresIn: expiry,
	});
export { throwError, handleError, generateToken };
