import {NgModule} from '@angular/core';
import {LoginComponent} from "../composants/user/login/login.component";
import {RegisterComponent} from "../composants/user/register/register.component";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login'},

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
