import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService, NzNotificationService } from 'ng-zorro-antd';
import { Subject } from 'rxjs';
import { EmployeeService } from '../../shared/service/employee.service';
import { CreateEditModalComponent } from './create-edit-modal/create-edit-modal.component';
import { takeUntil, debounceTime } from 'rxjs/operators';
import { textChangeRangeIsUnchanged } from 'typescript';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.html',
	styleUrls: ['./dashboard.scss'],
})
export class DashboardComponent implements OnInit {
	searchChange$ = new Subject<any>();
	showEditModal = true;
	searchValue = '';
	listOfDisplayData: Array<{
		employeeId: string;
		department: string;
		firstName: string;
		lastName: string;
		salaryPerAnnum: string;
		payrollstatusPresentmonth: string;
	}> = [];
	listOfColumn = [
		{ key: 'employeeId', value: 'Employee ID' },
		{ key: 'department', value: 'Department' },
		{ key: 'firstName', value: 'First Name' },
		{ key: 'lastName', value: 'Last Name' },
		{ key: 'salaryPerAnnum', value: 'Salary per Annum' },
		{ key: 'payrollPresentMonth', value: 'Payroll status' },
		{ key: 'actions', value: 'Actions' },
	];
	sortName = '';
	sortValue = '';
	filteredData: Array<{
		employeeId: string;
		department: string;
		firstName: string;
		lastName: string;
		salaryPerAnnum: string;
		payrollstatusPresentmonth: string;
	}> = [];
	constructor(
		private router: Router,
		private employeeService: EmployeeService,
		private userService: UserService,
		private modal: NzModalService,
		private alert: NzNotificationService
	) {}

	ngOnInit(): void {
		this.employeeService.fetchAllEmployees().subscribe((res: any) => {
			if (res.obj.length > 0) {
				this.listOfDisplayData = res.obj;
				this.listOfDisplayData = [...this.listOfDisplayData];
				this.filteredData = this.listOfDisplayData;
			}
		});
	}
	showModal(action: any, id: any) {
		console.log(action, id);
		if (action === 'create') {
			console.log(action, 'here');
			this.modal.create({
				nzContent: CreateEditModalComponent,
				nzWidth: '50%',
				nzFooter: null,
				nzTitle: 'Create an employee',
				nzVisible: this.showEditModal,
				nzOnCancel: () => this.fetchAllEmployees(),
				nzOnOk: () => this.fetchAllEmployees(),
				nzBodyStyle: { height: '40%' },
				nzStyle: { top: '2rem' },
			});
		}
		if (action === 'edit') {
			this.modal.create({
				nzContent: CreateEditModalComponent,
				nzWidth: '40%',
				nzFooter: null,
				nzVisible: this.showEditModal,
				nzOnCancel: async () => {
					this.fetchAllEmployees();
					this.showEditModal=false;
					return true;
				},
				nzOnOk: async () => {
					this.fetchAllEmployees();
					this.showEditModal=false;
					return true;
				},
				nzTitle: 'Edit employee details',
				nzBodyStyle: { height: '40%' },
				nzStyle: { top: '2rem' },
				nzComponentParams: {
					employeeId: id,
				},
			});
		}
	}
	fetchAllEmployees() {
		this.employeeService.fetchAllEmployees().subscribe((res: any) => {
			if (res.obj.length > 0) {
				this.listOfDisplayData = res.obj
				this.listOfDisplayData = [...this.listOfDisplayData];
				this.filteredData= this.listOfDisplayData;
			}
		});
	}
	delete(id: string) {
		this.modal.confirm({
			nzTitle: `Do you want to delete this employee details?`,
			nzOkText: 'Delete',
			nzCancelText: 'Cancel',
			nzOnOk: () => this.deleteEmployee(id),
		});
	}
	deleteEmployee(id: any) {
		console.log(id, 'employeeId');
		this.employeeService.deleteEmployee(id).subscribe(
			(res: any) => {
				const findIndex = this.listOfDisplayData.findIndex((data) => data.employeeId === id);
				this.listOfDisplayData.splice(findIndex, 1);
				this.listOfDisplayData = [...this.listOfDisplayData];
				this.alert.success('success', 'Employee details succesfully deleted');
			},
			(err: any) => {
				this.alert.error('error', 'Some error Occured');
			}
		);
	}

	onSearch(event: any) {
		let filteredDataOnSearch = this.listOfDisplayData.filter((data) => data.department === event);
		console.log(filteredDataOnSearch);
		if (filteredDataOnSearch.length > 0) {
			this.listOfDisplayData = filteredDataOnSearch;
		} else {
			this.listOfDisplayData = this.filteredData;
		}
		this.listOfDisplayData = [...this.listOfDisplayData];
	}

	sort(event: any) {}
	logout(){
		this.userService.logout();
		this.router.navigate(['/login']);
	}
}
