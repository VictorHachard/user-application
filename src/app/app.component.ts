// noinspection JSIgnoredPromiseFromCall

import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../_services/authentication.service";
import {Router} from "@angular/router";
import {UserSecurity} from "../_models/user.security";
import {environment} from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  apiRessourceUrl = environment.apiRessourceUrl

  title = 'user-application';
  currentUser!: UserSecurity;
  value!: string;

  constructor(private router: Router,
    private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => { this.currentUser = x; this.ngOnInit(); });
  }

  ngOnInit(): void {
    if (this.currentUser) {
      document.documentElement.style.setProperty('--primary-color', this.currentUser.themeSimplifiedDto!.primaryColor!);
      document.documentElement.style.setProperty('--secondary-color', this.currentUser.themeSimplifiedDto!.secondaryColor!);
      document.documentElement.style.setProperty('--tertiary-color', this.currentUser.themeSimplifiedDto!.tertiaryColor!);
      document.documentElement.style.setProperty('--quaternary-color', this.currentUser.themeSimplifiedDto!.quaternaryColor!);
      document.documentElement.style.setProperty('--primary-text-color', this.currentUser.themeSimplifiedDto!.primaryTextColor!);
      document.documentElement.style.setProperty('--secondary-text-color', this.currentUser.themeSimplifiedDto!.secondaryTextColor!);
      document.documentElement.style.setProperty('--primary-alert-success-color', this.currentUser.themeSimplifiedDto!.primaryAlertSuccessColor!);
      document.documentElement.style.setProperty('--secondary-alert-success-color', this.currentUser.themeSimplifiedDto!.secondaryAlertSuccessColor!);
      document.documentElement.style.setProperty('--tertiary-alert-success-color', this.currentUser.themeSimplifiedDto!.tertiaryAlertSuccessColor!);
      document.documentElement.style.setProperty('--primary-alert-warning-color', this.currentUser.themeSimplifiedDto!.primaryAlertWarningColor!);
      document.documentElement.style.setProperty('--secondary-alert-warning-color', this.currentUser.themeSimplifiedDto!.secondaryAlertWarningColor!);
      document.documentElement.style.setProperty('--tertiary-alert-warning-color', this.currentUser.themeSimplifiedDto!.tertiaryAlertWarningColor!);
      document.documentElement.style.setProperty('--primary-alert-danger-color', this.currentUser.themeSimplifiedDto!.primaryAlertDangerColor!);
      document.documentElement.style.setProperty('--secondary-alert-danger-color', this.currentUser.themeSimplifiedDto!.secondaryAlertDangerColor!);
      document.documentElement.style.setProperty('--tertiary-alert-danger-color', this.currentUser.themeSimplifiedDto!.tertiaryAlertDangerColor!);
      document.documentElement.style.setProperty('--primary-alert-primary-color', this.currentUser.themeSimplifiedDto!.primaryAlertPrimaryColor!);
      document.documentElement.style.setProperty('--secondary-alert-primary-color', this.currentUser.themeSimplifiedDto!.secondaryAlertPrimaryColor!);
      document.documentElement.style.setProperty('--tertiary-alert-primary-color', this.currentUser.themeSimplifiedDto!.tertiaryAlertPrimaryColor!);
    } else {
      document.documentElement.style.setProperty('--primary-color', '#f1f1f1');
      document.documentElement.style.setProperty('--secondary-color', '#eaeaea');
      document.documentElement.style.setProperty('--tertiary-color', '#e3e3e3');
      document.documentElement.style.setProperty('--quaternary-color', '#d4d4d4');
      document.documentElement.style.setProperty('--primary-text-color', '#1a1a1a');
      document.documentElement.style.setProperty('--secondary-text-color', '#3b3b3b');
      document.documentElement.style.setProperty('--primary-alert-success-color', '#d1e7dd');
      document.documentElement.style.setProperty('--secondary-alert-success-color', '#badbcc');
      document.documentElement.style.setProperty('--tertiary-alert-success-color', '#0f5132');
      document.documentElement.style.setProperty('--primary-alert-warning-color', '#fff3cd');
      document.documentElement.style.setProperty('--secondary-alert-warning-color', '#ffecb5');
      document.documentElement.style.setProperty('--tertiary-alert-warning-color', '#664d03');
      document.documentElement.style.setProperty('--primary-alert-danger-color', '#f8d7da');
      document.documentElement.style.setProperty('--secondary-alert-danger-color', '#f5c2c7');
      document.documentElement.style.setProperty('--tertiary-alert-danger-color', '#842029');
      document.documentElement.style.setProperty('--primary-alert-primary-color', '#cce5ff');
      document.documentElement.style.setProperty('--secondary-alert-primary-color', '#b8daff');
      document.documentElement.style.setProperty('--tertiary-alert-primary-color', '#004085');
    }
    document.documentElement.style.setProperty('--primary-btn-color', '#0d6efd');
    document.documentElement.style.setProperty('--secondary-btn-color', '#eaeaea');
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
    this.ngOnInit();
  }

}
