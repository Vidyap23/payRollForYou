import express from 'express';

import { router as authentication } from './users';
import { router as employees } from './employee';

const router = express.Router();
router.use('/auth', authentication);
router.use('/employee', employees)
export { router };
