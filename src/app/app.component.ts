// noinspection JSIgnoredPromiseFromCall

import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../_services/authentication.service";
import {Router} from "@angular/router";
import {UserSecurity} from "../_models/user.security";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
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
    } else {
      document.documentElement.style.setProperty('--primary-color', '#f1f1f1');
      document.documentElement.style.setProperty('--secondary-color', '#eaeaea');
      document.documentElement.style.setProperty('--tertiary-color', '#e3e3e3');
      document.documentElement.style.setProperty('--quaternary-color', '#d4d4d4');
      document.documentElement.style.setProperty('--primary-text-color', '#1a1a1a');
      document.documentElement.style.setProperty('--secondary-text-color', '#3b3b3b');
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
