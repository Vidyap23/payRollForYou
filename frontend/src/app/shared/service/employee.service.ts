import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { of } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class EmployeeService {
	constructor(private http: HttpClient) {}
	endpoint = 'http://localhost:4000/api/employee/';
	fetchAllEmployees() {
		return this.http.get(this.endpoint + 'fetchAllEmployees');
	}
	fetchEmployee(id: string) {
		return this.http.get(this.endpoint + `fetchEmployeeWithId?id=${id}`);
	}
	updateEmployeeDetails(employeeConfig: any) {
		return this.http.post(this.endpoint + 'updateEmployeeDetails', employeeConfig);
	}
	createEmployee(employeeConfig: any) {
		return this.http.post(this.endpoint + 'createEmployee', employeeConfig);
	}
	deleteEmployee(id: string) {
		return this.http.post(this.endpoint + 'deleteEmployee', {employeeId: id});
	}
}
