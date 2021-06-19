import {NgModule} from '@angular/core';
import {LoginComponent} from "../composants/user/login/login.component";
import {RegisterComponent} from "../composants/user/register/register.component";
import {RouterModule, Routes} from "@angular/router";
import {SettingComponent} from "../composants/user/setting/setting.component";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login'},

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},

  { path: 'setting', component: SettingComponent},

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
