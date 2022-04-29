import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NzAlertComponent, NzNotificationService } from 'ng-zorro-antd';
import { EmployeeService } from 'src/app/shared/service/employee.service';
import { en_US, NzI18nService } from 'ng-zorro-antd';
@Component({
	selector: 'app-create-edit-modal',
	templateUrl: './create-edit-modal.component.html',
	styleUrls: ['./create-edit-modal.component.scss'],
})
export class CreateEditModalComponent implements OnInit {
	constructor(
		private employeeService: EmployeeService,
		private alert: NzNotificationService,
		private i18n: NzI18nService
	) {}
	listOfDisplayData: Array<{
		employeeId: string;
		department: string;
		firstName: string;
		lastName: string;
		email: string;
		joiningDate: Date;
		salaryPerAnnum: string;
		payrollstatusPresentmonth: string;
	}> = [];
	employeeId = '';
	employeeConfig: any;
	employeeForm = new FormGroup({
		employeeId: new FormControl('', [Validators.required]),
		department: new FormControl('', [Validators.required]),
		firstName: new FormControl('', [Validators.required]),
		lastName: new FormControl('', [Validators.required]),
		email: new FormControl('', [Validators.required, Validators.email]),
		joiningDate: new FormControl('', [Validators.required]),
		salaryPerAnnum: new FormControl('', [Validators.required]),
		payrollstatusPresentmonth: new FormControl('', [Validators.required]),
	});
	ngOnInit(): void {
		this.i18n.setLocale(en_US);
		if (this.employeeId) {
			this.employeeService.fetchEmployee(this.employeeId).subscribe((res: any) => {
				if (res.obj) {
					this.employeeConfig = res.obj;
					console.log(res.obj);
					const {
						employeeId,
						department,
						firstName,
						lastName,
						email,
						joiningDate,
						salaryPerAnnum,
						payrollstatusPresentmonth,
					} = this.employeeConfig;
					this.employeeForm.setValue({
						employeeId,
						department,
						firstName,
						lastName,
						email,
						joiningDate,
						salaryPerAnnum,
						payrollstatusPresentmonth,
					});
				}
			});
		}
	}
	submitForm() {
		console.log(this.employeeForm.value, 'values');
		if (!this.employeeForm.valid) {
			this.alert.error('error', 'Please make sure all fields are filled');
		}
		if (this.employeeId && this.employeeForm.valid) {
			const employeeConfig = {
				employeeId: this.employeeId,
				department: this.employeeForm.value.department,
				firstName: this.employeeForm.value.firstName,
				lastName: this.employeeForm.value.lastName,
				joiningDate: this.employeeForm.value.joiningDate,
				email: this.employeeForm.value.email,
				salaryPerAnnum: this.employeeForm.value.salaryPerAnnum,
				payrollstatusPresentmonth: this.employeeForm.value.payrollstatusPresentmonth,
			};
			this.employeeService.updateEmployeeDetails(employeeConfig).subscribe(
				(res: any) => {
					if (res.obj) {
						this.alert.success('success', 'The employee details has been succesfully edited');
					}
				},
				(err) => {
					this.alert.error('error', 'Something went wrong, please try again');
				}
			);
		} else if (this.employeeForm.valid) {
			const employeeConfig = {
				employeeId: this.employeeForm.value.employeeId,
				department: this.employeeForm.value.department,
				firstName: this.employeeForm.value.firstName,
				lastName: this.employeeForm.value.lastName,
				joiningDate: this.employeeForm.value.joiningDate,
				email: this.employeeForm.value.email,
				salaryPerAnnum: this.employeeForm.value.salaryPerAnnum,
				payrollstatusPresentmonth: this.employeeForm.value.payrollstatusPresentmonth,
			};
			this.employeeService.createEmployee(employeeConfig).subscribe(
				(res: any) => {
						this.alert.success('success', 'The employee details has been succesfully created');
				},
				(err) => {
					console.log(err)
					this.alert.error('error', 'Please recheck the employee id and try again');
				}
			);
		}
	}
}
