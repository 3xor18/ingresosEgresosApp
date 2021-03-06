import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { dasboardRoutes } from './dashboar.routes';
import { AuthGuardService } from '../auth/auth-guard.service';

const routes: Routes = [
  { path: '', component: DashboardComponent, children: dasboardRoutes/* , canActivate: [AuthGuardService] */ },
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
