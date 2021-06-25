import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AlertManager} from "../../../../../_helpers/alert.manager";
import {UserSecurity} from "../../../../../_models/user.security";
import {UserService} from "../../../../../_services/_api/user.service";
import {Utils} from "../../../../../_helpers/utils";
import {environment} from "../../../../../environments/environment";
import {AuthenticationService} from "../../../../../_services/authentication.service";

@Component({
  selector: 'app-setting-security',
  templateUrl: './setting-security.component.html',
  styleUrls: ['./setting-security.component.scss']
})
export class SettingSecurityComponent {

  passwordForm!: FormGroup;
  twoFactorForm!: FormGroup;
  alertManagerManager: AlertManager = new AlertManager();

  user!: UserSecurity;
  @Output() isSummited = new EventEmitter<boolean>();

  constructor(private authenticationService: AuthenticationService, private userService: UserService) {
    this.authenticationService.currentUser.subscribe(x => {this.user = x; this.ngOnInit();});
  }

  ngOnInit(): void {
    this.passwordForm = new FormGroup({
        oldPassword: new FormControl(!environment.production ? 'Test123*' : '', [Validators.required, Validators.pattern('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=*])(?=\\S+$).{6,}')]),
        newPassword: new FormControl(!environment.production ? 'Test123**' : '', [Validators.required, Validators.pattern('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=*])(?=\\S+$).{6,}')]),
        newPasswordConfirm: new FormControl(!environment.production ? 'Test123**' : '', [Validators.required, Validators.pattern('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=*])(?=\\S+$).{6,}')])},
      { validators: Utils.matchPassword('newPassword', 'newPasswordConfirm')
    });
  }

  get f() { return this.passwordForm.controls; }

  password(): void {
    this.userService.actionSetPassword({oldPassword: this.f.oldPassword.value, newPassword: this.f.newPassword.value}).subscribe(value => {
      this.alertManagerManager.addAlertIcon('password');
      this.alertManagerManager.addAlert('Your password has been changed', 'alert-success');
      this.isSummited.emit(true);
    }, error => {
      this.alertManagerManager.addAlert('Your old password is incorrect', 'alert-danger');
    });
  }
}
