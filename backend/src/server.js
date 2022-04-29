import { connectToDatabase } from './config/database';
import { router as routes } from './routes';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const port = process.env.PORT || 4000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', routes);

// Listen to server
app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
