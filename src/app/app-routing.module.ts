import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {LoginComponent} from "./login/login.component";
import {UserListComponent} from "./user-list/user-list.component";
import {ProductListComponent} from "./product-list/product-list.component";

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {
    path: 'dashboard', component: DashboardComponent, children: [
      {
        path: '',
        component: UserListComponent
      },
      {
        path: 'product',
        component: ProductListComponent
      }
    ]
  },
  {path: 'login', component: LoginComponent},
  {path: 'users', component: UserListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

