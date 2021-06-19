import {NgModule} from '@angular/core';
import {LoginComponent} from "../composants/user/login/login.component";
import {RegisterComponent} from "../composants/user/register/register.component";
import {RouterModule, Routes} from "@angular/router";
import {SettingComponent} from "../composants/user/setting/setting.component";
import {ConfirmEmailComponent} from "../composants/user/actions/confirm-email/confirm-email.component";
import {ResetPasswordComponent} from "../composants/user/actions/reset-password/reset-password.component";
import {DeleteComponent} from "../composants/user/actions/delete/delete.component";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login'},

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},

  { path: 'setting', component: SettingComponent},

  { path: 'confirm/email/:token', component: ConfirmEmailComponent},
  { path: 'reset/password/:token', component: ResetPasswordComponent},
  { path: 'delete/:token', component: DeleteComponent},

  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
