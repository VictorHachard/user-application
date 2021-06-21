import {Component} from '@angular/core';
import {AuthenticationService} from "../_services/authentication.service";
import {Router} from "@angular/router";
import {UserSecurity} from "../_models/user.security";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'user-application';
  currentUser!: UserSecurity;
  value!: string;

  constructor(private router: Router,
    private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => { this.currentUser = x; this.value = this.currentUser.themeSimplifiedDto!.name!.replace(' ', '-').toLowerCase();});
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
