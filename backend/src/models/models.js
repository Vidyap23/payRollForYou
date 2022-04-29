const mongoose = require('mongoose');

const EmployerSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	emaployerId: {
		type: String,
		required: false,
	},
	password: {
		type: String,
		required: true,
	},
	signUpDate: {
		type: Date,
		required: true,
	},
});
const EmployeeSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		required: true,
	},
	employeeId: {
		type: String,
		required: true,
	},
	department: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	joiningDate: {
		type: Date,
		required: true,
	},
	createdDate: {
		type: Date,
		required: true,
	},
	salaryPerAnnum: {
		type: String,
		required: true,
	},
	payrollstatusPresentmonth: {
		type: String,
		required: true,
	},
});

const Employer = mongoose.model('Employer', EmployerSchema);
const Employee = mongoose.model('Employee', EmployeeSchema);
export { Employer, Employee };
