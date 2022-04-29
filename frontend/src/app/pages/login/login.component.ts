import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
	loginForm!: FormGroup;
	showSignUpForm = false;
	signupForm!: FormGroup;
	constructor(
		private fb: FormBuilder,
		private userService: UserService,
		private alert: NzNotificationService,
		private router: Router
	) {}

	ngOnInit(): void {
		this.loginForm = this.fb.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required]],
			rememberMeChecked: false,
		});
		this.signupForm = this.fb.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required]],
			userName: ['', [Validators.required]],
			employerId: ['', [Validators.required]],
		});
	}
	loginUser() {
		if (!this.loginForm.valid) {
			this.alert.error('error', 'Please fill all the fields and try again');
			return;
		}
		const loginConfig = {
			email: this.loginForm.value.email,
			password: this.loginForm.value.password,
		};
		this.userService.loginUser(loginConfig).subscribe(
			(res: any) => {
				if (res.obj) {
					const token = res.obj.token;
					this.userService.saveAuthToken(token);
					this.router.navigate(['/dashboard']);
				}
			},
			(err) => {
				this.alert.error('error', 'Please try logging in again');
			}
		);
	}
	registerUser() {
		console.log(this.signupForm.value);
		if (!this.signupForm.valid) {
			this.alert.error('error', 'Please fill all the fields and try again');
			return;
		}
		const userSignUpDoc = {
			userName: this.signupForm.value.userName,
			email: this.signupForm.value.email,
			password: this.signupForm.value.password,
			employerId: this.signupForm.value.employerId,
			signupDate: new Date(),
		};
		this.userService.signUpUser(userSignUpDoc).subscribe(
			(res: any) => {
				if (res.obj) {
					this.alert.success('success', 'The user has been succesfully created, please login');
				}
			},
			(err) => {
				this.alert.error('error', 'Please try signing up again');
			}
		);
	}
	showForm() {
		this.showSignUpForm = true;
	}
	showLoginForm() {
		this.showSignUpForm = false;
	}
}
