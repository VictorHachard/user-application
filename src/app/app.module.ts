import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {LoginComponent} from '../composants/user/login/login.component';
import {RegisterComponent} from '../composants/user/register/register.component';
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
import {SettingProfileComponent} from '../composants/user/settings/user/setting-profile/setting-profile.component';
import {SettingAccountComponent} from '../composants/user/settings/user/setting-account/setting-account.component';
import {SettingAppearanceComponent} from '../composants/user/settings/user/setting-appearance/setting-appearance.component';
import {SettingSecurityComponent} from '../composants/user/settings/user/setting-security/setting-security.component';
import {SettingEmailsComponent} from '../composants/user/settings/user/setting-emails/setting-emails.component';
import {SettingsComponent} from '../composants/user/settings/settings/settings.component';
import {SettingSecurityLogComponent} from '../composants/user/settings/user/setting-security-log/setting-security-log.component';
import {ProfileComponent} from '../composants/user/profile/profile.component';
import {ForgetPasswordComponent} from '../composants/user/actions/forget-password/forget-password.component';
import {SettingBlockedUsersComponent} from '../composants/user/settings/user/setting-blocked-users/setting-blocked-users.component';
import {SettingInteractionLimitsComponent} from '../composants/user/settings/user/setting-interaction-limits/setting-interaction-limits.component';
import {SettingThemesComponent} from '../composants/user/settings/owner/setting-themes/setting-themes.component';
import {SettingGroupsComponent} from '../composants/user/settings/owner/setting-groups/setting-groups.component';
import {SettingUsersComponent} from '../composants/user/settings/administrator/setting-users/setting-users.component';
import {TwoFactorEmailComponent} from '../composants/user/two-factor/two-factor-email/two-factor-email.component';
import {SettingTermsOfServiceComponent} from '../composants/user/settings/owner/laws/setting-terms-of-service/setting-terms-of-service.component';
import {SettingPrivacyComponent} from '../composants/user/settings/owner/laws/setting-privacy/setting-privacy.component';
import {SettingLawsComponent} from '../composants/user/settings/owner/laws/setting-laws/setting-laws.component';
import {NgxEditorModule} from "ngx-editor";
import {NotificationsComponent} from '../composants/user/notifications/notifications.component';
import {SettingNotificationsComponent} from '../composants/user/settings/user/setting-notifications/setting-notifications.component';
import {HelpComponent} from '../composants/help/help.component';
import {PrivacyComponent} from '../composants/laws/privacy/privacy.component';
import {TermsOfServiceComponent} from '../composants/laws/terms-of-service/terms-of-service.component';
import {SettingCookiesAuthenticationComponent} from '../composants/user/settings/user/cookies/setting-cookies-authentication/setting-cookies-authentication.component';
import {SettingCookiesComponent} from '../composants/user/settings/user/cookies/setting-cookies/setting-cookies.component';
import {SettingEmailsTemplatesComponent} from '../composants/user/settings/owner/setting-emails-templates/setting-emails-templates.component';
import {SettingEmailsActionComponent} from '../composants/user/settings/administrator/setting-emails-action/setting-emails-action.component';
import {SettingUserSettingsComponent} from '../composants/user/settings/owner/setting-user-settings/setting-user-settings.component';
import {SettingAddressComponent} from '../composants/user/settings/user/setting-address/setting-address.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent,
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
    SettingSecurityLogComponent,
    ProfileComponent,
    ForgetPasswordComponent,
    SettingBlockedUsersComponent,
    SettingInteractionLimitsComponent,
    SettingThemesComponent,
    SettingGroupsComponent,
    SettingUsersComponent,
    TwoFactorEmailComponent,
    SettingTermsOfServiceComponent,
    SettingPrivacyComponent,
    SettingLawsComponent,
    NotificationsComponent,
    SettingNotificationsComponent,
    HelpComponent,
    PrivacyComponent,
    TermsOfServiceComponent,
    SettingCookiesAuthenticationComponent,
    SettingCookiesComponent,
    SettingEmailsTemplatesComponent,
    SettingEmailsActionComponent,
    SettingUserSettingsComponent,
    SettingAddressComponent
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
    MatSelectModule,
    NgxEditorModule
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
