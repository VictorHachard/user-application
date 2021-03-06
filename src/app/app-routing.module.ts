import {NgModule} from '@angular/core';
import {LoginComponent} from "../composants/user/login/login.component";
import {RegisterComponent} from "../composants/user/register/register.component";
import {RouterModule, Routes} from "@angular/router";
import {ConfirmEmailComponent} from "../composants/user/actions/confirm-email/confirm-email.component";
import {ResetPasswordComponent} from "../composants/user/actions/reset-password/reset-password.component";
import {DeleteComponent} from "../composants/user/actions/delete/delete.component";
import {HomeComponent} from "../composants/home/home.component";
import {SettingsComponent} from "../composants/user/settings/settings/settings.component";
import {ProfileComponent} from "../composants/user/profile/profile.component";
import {ForgetPasswordComponent} from "../composants/user/actions/forget-password/forget-password.component";
import {
  AuthGuardService,
  NotAuthGuardService
} from "../_helpers/_guards/auth-guard.service";
import {TwoFactorEmailComponent} from "../composants/user/two-factor/two-factor-email/two-factor-email.component";
import {NotificationsComponent} from "../composants/user/notifications/notifications.component";
import {HelpComponent} from "../composants/help/help.component";
import {TermsOfServiceComponent} from "../composants/laws/terms-of-service/terms-of-service.component";
import {PrivacyComponent} from "../composants/laws/privacy/privacy.component";
import {
  PermissionAdministratorGuardService,
  PermissionOwnerGuardService, PermissionUserGuardService
} from "../_helpers/_guards/permission-guard.service";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home'},
  { path: 'home', component: HomeComponent},

  { path: 'terms-of-service', component: TermsOfServiceComponent},
  { path: 'privacy', component: PrivacyComponent},

  { path: 'login', component: LoginComponent, canActivate: [NotAuthGuardService]},
  { path: 'register', component: RegisterComponent, canActivate: [NotAuthGuardService]},
  { path: 'two-factor', component: TwoFactorEmailComponent, canActivate: [NotAuthGuardService]},

  { path: 'notifications', component: NotificationsComponent, canActivate: [AuthGuardService]},
  { path: 'help', component: HelpComponent},

  { path: 'settings/owner/:param', component: SettingsComponent, canActivate: [AuthGuardService, PermissionOwnerGuardService]},
  { path: 'settings/owner/:param/:param2', component: SettingsComponent, canActivate: [AuthGuardService, PermissionOwnerGuardService]},
  { path: 'settings/administrator/:param', component: SettingsComponent, canActivate: [AuthGuardService, PermissionAdministratorGuardService]},
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuardService, PermissionUserGuardService]},
  { path: 'settings/:param', component: SettingsComponent, canActivate: [AuthGuardService, PermissionUserGuardService]},
  { path: 'settings/:param/:param2', component: SettingsComponent, canActivate: [AuthGuardService, PermissionUserGuardService]},

  { path: 'profile/:username', component: ProfileComponent},

  { path: 'confirm/email/:token', component: ConfirmEmailComponent},
  { path: 'reset/password/:token', component: ResetPasswordComponent},
  { path: 'delete/:token', component: DeleteComponent},
  { path: 'forget', component: ForgetPasswordComponent},

  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
