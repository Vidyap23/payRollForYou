import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../shared/service/user.service';

@Injectable({
	providedIn: 'root',
})
export class LoggedInAuthGuard implements CanActivate {
	constructor(private authenticationService: UserService, private router: Router) {}
	canActivate() {
		if (this.authenticationService.tokenExist() && !this.authenticationService.isTokenExpired()) {
			this.router.navigate(['/dashboard']);
			return false;
		}
		return true;
	}
}