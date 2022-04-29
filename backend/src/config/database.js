const mongoose = require('mongoose');

const connectToDatabase = async () => {
	const uri = `mongodb+srv://${process.env.MONGO_URI}@cluster0.bdevs.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
	mongoose
		.connect(uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => console.log('Database connected!'))
		.catch((err) => console.log(err));
};
export { connectToDatabase };
