import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
const helper = new JwtHelperService();

@Injectable({
	providedIn: 'root',
})
export class UserService {
	endpoint = 'http://localhost:4000/api/auth/';
	constructor(private http: HttpClient) {}
	private _isAuthenticated = new BehaviorSubject<boolean>(this.tokenExist());

	loginUser(user: any) {
		return this.http.post(this.endpoint + 'login', user);
	}

	signUpUser(user: any) {
		return this.http.post(this.endpoint + 'signUpUser', user);
	}

	public isAuthenticated(): Observable<boolean> {
		return this._isAuthenticated.asObservable();
	}
	public tokenExist() {
		return !!localStorage.getItem('token');
	}

	public isTokenExpired(): boolean {
		const token = localStorage.getItem('token') || '';
		return helper.isTokenExpired(token);
	}

	public saveAuthToken(token: string): void {
		localStorage.setItem('token', token);
		this._isAuthenticated.next(true);
	}

	logout() {
		localStorage.removeItem('token');
		this._isAuthenticated.next(false);
	}
}
