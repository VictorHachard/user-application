import {Component, EventEmitter, Output} from '@angular/core';
import {AlertManager} from "../../../../../_helpers/alert.manager";
import {UserSecurity} from "../../../../../_models/user.security";
import {AuthenticationService} from "../../../../../_services/authentication.service";
import {UserService} from "../../../../../_services/_api/user.service";

@Component({
  selector: 'app-setting-notifications',
  templateUrl: './setting-notifications.component.html',
  styleUrls: ['./setting-notifications.component.scss']
})
export class SettingNotificationsComponent {

  alertManagerManager: AlertManager = new AlertManager();
  _reload = true;

  user!: UserSecurity;
  @Output() isSummited = new EventEmitter<boolean>();

  constructor(private authenticationService: AuthenticationService, private userService: UserService) {
    this.authenticationService.currentUser.subscribe(x => {this.user = x; this.ngOnInit();});
  }

  ngOnInit(): void {
  }

}
