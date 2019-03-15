import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './main/dashboard/dashboard.component';
import {RentBookComponent} from './main/rent-book/rent-book.component';
import {ReturnBookComponent} from './main/return-book/return-book.component';
import {LoginComponent} from './main/login/login.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'rent/:id', component: RentBookComponent},
  {path: 'return/:id', component: ReturnBookComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: false})],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {
}
