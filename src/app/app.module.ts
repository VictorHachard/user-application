import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {LoginComponent} from '../composants/user/login/login.component';
import {RegisterComponent} from '../composants/user/register/register.component';
import {SettingComponent} from '../composants/user/setting/setting.component';
import {ConnectFromCookieComponent} from '../composants/user/connect-from-cookie/connect-from-cookie.component';
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {TokenInterceptor} from "../_helpers/token.intereceptor";
import {ErrorInterceptor} from "../_helpers/error.interceptor";
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {ConfirmEmailComponent} from "../composants/user/actions/confirm-email/confirm-email.component";
import {ResetPasswordComponent} from "../composants/user/actions/reset-password/reset-password.component";
import {DeleteComponent} from '../composants/user/actions/delete/delete.component';
import {HomeComponent} from '../composants/home/home.component';
import {SettingProfileComponent} from '../composants/user/se/setting-profile/setting-profile.component';
import {SettingAccountComponent} from '../composants/user/se/setting-account/setting-account.component';
import {SettingAppearanceComponent} from '../composants/user/se/setting-appearance/setting-appearance.component';
import {SettingSecurityComponent} from '../composants/user/se/setting-security/setting-security.component';
import {SettingEmailsComponent} from '../composants/user/se/setting-emails/setting-emails.component';
import {SettingsComponent} from '../composants/user/se/settings/settings.component';
import {SettingSecurityLogComponent} from '../composants/user/se/setting-security-log/setting-security-log.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent,
    SettingComponent,
    ConnectFromCookieComponent,
    ConfirmEmailComponent,
    DeleteComponent,
    HomeComponent,
    SettingProfileComponent,
    SettingAccountComponent,
    SettingAppearanceComponent,
    SettingSecurityComponent,
    SettingEmailsComponent,
    SettingsComponent,
    SettingSecurityLogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatOptionModule,
    MatSelectModule
  ],
  exports: [
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
