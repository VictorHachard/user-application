import {Component, EventEmitter, Output} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {AlertManager} from "../../../../../_helpers/alert.manager";
import {UserSecurity} from "../../../../../_models/user.security";
import {UserService} from "../../../../../_services/_api/user.service";
import {AuthenticationService} from "../../../../../_services/authentication.service";

@Component({
  selector: 'app-setting-account',
  templateUrl: './setting-account.component.html',
  styleUrls: ['./setting-account.component.scss']
})
export class SettingAccountComponent {

  usernameForm!: UntypedFormGroup;
  deleteForm!: UntypedFormGroup;
  alertManagerManager: AlertManager = new AlertManager();

  user!: UserSecurity;
  @Output() isSummited = new EventEmitter<boolean>();

  constructor(private authenticationService: AuthenticationService, private userService: UserService) {
    this.authenticationService.currentUser.subscribe(x => {this.user = x; this.ngOnInit();});
  }

  ngOnInit(): void {
    this.usernameForm = new UntypedFormGroup({
        username: new UntypedFormControl(this.user.username, Validators.required)
    });
    this.deleteForm = new UntypedFormGroup({});
  }

  get f() { return this.usernameForm.controls; }

  username(): void {
    this.userService.updateUsername({username: this.f.username.value}).subscribe(value => {
      this.alertManagerManager.addAlertIcon('username');
      this.isSummited.emit(true);
    }, error => {
      this.alertManagerManager.addAlert('The user already exists', 'alert-danger');
    });
  }

  delete(): void {

  }

  export(): void {

  }
}
