import {Component, EventEmitter, Output} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
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

  passwordForm!: UntypedFormGroup;
  twoFactorEmailForm!: UntypedFormGroup;
  recoveryCodes!: UntypedFormGroup;
  alertManagerManager: AlertManager = new AlertManager();

  user!: UserSecurity;
  @Output() isSummited = new EventEmitter<boolean>();

  constructor(private authenticationService: AuthenticationService,
              private userService: UserService) {
    this.authenticationService.currentUser.subscribe(x => {this.user = x; this.ngOnInit();});
  }

  ngOnInit(): void {
    this.passwordForm = new UntypedFormGroup({
        oldPassword: new UntypedFormControl(!environment.production ? 'Test123*' : '', [Validators.required, Validators.pattern('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=*])(?=\\S+$).{6,}')]),
        newPassword: new UntypedFormControl(!environment.production ? 'Test123**' : '', [Validators.required, Validators.pattern('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=*])(?=\\S+$).{6,}')]),
        newPasswordConfirm: new UntypedFormControl(!environment.production ? 'Test123**' : '', [Validators.required, Validators.pattern('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=*])(?=\\S+$).{6,}')])},
      { validators: Utils.matchPassword('newPassword', 'newPasswordConfirm')
    });
    this.twoFactorEmailForm = new UntypedFormGroup({
        twoFactorEmail: new UntypedFormControl(this.user.twoFactorEmail, Validators.required)
    });
    this.recoveryCodes = new UntypedFormGroup({

    });
  }

  get f() { return this.passwordForm.controls; }

  get fTwoFactorEmailForm() { return this.twoFactorEmailForm.controls; }

  get fRecoveryCodes() { return this.recoveryCodes.controls; }

  password(): void {
    this.userService.actionSetPassword({oldPassword: this.f.oldPassword.value, newPassword: this.f.newPassword.value}).subscribe(value => {
      this.alertManagerManager.addAlertIcon('password');
      this.alertManagerManager.addAlert('Your password has been changed', 'alert-success');
      this.isSummited.emit(true);
    }, error => {
      this.alertManagerManager.addAlert('Your old password is incorrect', 'alert-danger');
    });
  }

  emailTwoFactor(): void {
    this.userService.updateTwoFactorEmail({active: !this.fTwoFactorEmailForm.twoFactorEmail.value}).subscribe(value => {
      this.alertManagerManager.addAlertIcon('emailTwoFactor');
      this.alertManagerManager.addAlert('Your activated the two-factor authentication by email ', 'alert-success');
      this.isSummited.emit(true);
    }, error => {
      this.alertManagerManager.addAlert('The principal email is not confirmed', 'alert-danger');
    });
  }
}
