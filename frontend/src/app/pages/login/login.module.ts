import { NgModule, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
export const routes: Routes = [{ path: '', component: LoginComponent, pathMatch: 'full' }];
@NgModule({
	declarations: [LoginComponent],
	imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class LoginModule {
	static routes = routes;
}
