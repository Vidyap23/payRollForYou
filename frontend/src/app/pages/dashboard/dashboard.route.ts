import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard';

const routes: Routes = [
  { path: '', component: DashboardComponent },
];

export const ROUTES = RouterModule.forChild(routes);