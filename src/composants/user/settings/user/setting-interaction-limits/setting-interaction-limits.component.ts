import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AlertManager} from "../../../../../_helpers/alert.manager";
import {UserSecurity} from "../../../../../_models/user.security";
import {AuthenticationService} from "../../../../../_services/authentication.service";
import {UserService} from "../../../../../_services/_api/user.service";

@Component({
  selector: 'app-setting-interaction-limits',
  templateUrl: './setting-interaction-limits.component.html',
  styleUrls: ['./setting-interaction-limits.component.scss']
})
export class SettingInteractionLimitsComponent implements OnInit {

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
