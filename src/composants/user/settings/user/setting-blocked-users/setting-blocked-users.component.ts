import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserSecurity} from "../../../../../_models/user.security";
import {AuthenticationService} from "../../../../../_services/authentication.service";
import {UserService} from "../../../../../_services/_api/user.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AlertManager} from "../../../../../_helpers/alert.manager";

@Component({
  selector: 'app-setting-blocked-users',
  templateUrl: './setting-blocked-users.component.html',
  styleUrls: ['./setting-blocked-users.component.scss']
})
export class SettingBlockedUsersComponent implements OnInit {

  emailPreference!: FormGroup;
  alertManagerManager: AlertManager = new AlertManager();

  user!: UserSecurity;
  @Output() isSummited = new EventEmitter<boolean>();

  constructor(private authenticationService: AuthenticationService, private userService: UserService) {
    this.authenticationService.currentUser.subscribe(x => {this.user = x; this.ngOnInit();});
  }

  ngOnInit(): void {
    this.emailPreference = new FormGroup({
      preference: new FormControl(this.user.emailPreferences, [Validators.required])
    });
  }

  get f() { return this.emailPreference.controls; }

}
