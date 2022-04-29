import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ROUTES } from './dashboard.route';
import { DashboardComponent } from './dashboard';
import { CreateEditModalComponent } from './create-edit-modal/create-edit-modal.component';

@NgModule({
	declarations: [DashboardComponent, CreateEditModalComponent],
	imports: [CommonModule, SharedModule, ROUTES],
	providers: [],
})
export class DashboardModule {}
