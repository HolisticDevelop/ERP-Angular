import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {LoginComponent} from "./login/login.component";
import {UserListComponent} from "./user-list/user-list.component";
import {ProductListComponent} from "./product-list/product-list.component";
import {AuthenticationGuard} from "./authentication.guard";
import {RegisterComponent} from "./register/register.component";

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {
    path: 'dashboard', canActivate:[AuthenticationGuard], component: DashboardComponent , children: [
      {
        path: '',
        component: UserListComponent
      },
      {
        path: 'product',
        component: ProductListComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      }
    ]
  },
  {path: 'login', component: LoginComponent}
  // {path: 'register', component: RegisterComponent}
  // {path: 'users', component: UserListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

