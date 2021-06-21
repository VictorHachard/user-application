import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AlertManager} from "../../../../_helpers/alert.manager";
import {UserSecurity} from "../../../../_models/user.security";
import {UserService} from "../../../../_services/_api/user.service";
import {Utils} from "../../../../_helpers/utils";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-setting-security',
  templateUrl: './setting-security.component.html',
  styleUrls: ['./setting-security.component.css']
})
export class SettingSecurityComponent implements OnInit {

  passwordForm!: FormGroup;
  twoFactorForm!: FormGroup;
  alertManagerManager!: AlertManager;

  user!: UserSecurity;
  @Output() isSummited = new EventEmitter<boolean>();

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.alertManagerManager = new AlertManager();
    this.passwordForm = new FormGroup({
        oldPassword: new FormControl(!environment.production ? 'Test123*' : '', [Validators.required, Validators.pattern('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=*])(?=\\S+$).{6,}')]),
        newPassword: new FormControl(!environment.production ? 'Test123**' : '', [Validators.required, Validators.pattern('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=*])(?=\\S+$).{6,}')]),
        newPasswordConfirm: new FormControl(!environment.production ? 'Test123**' : '', [Validators.required, Validators.pattern('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=*])(?=\\S+$).{6,}')])},
      { validators: Utils.matchPassword('newPassword', 'newPasswordConfirm')
    });
  }

  get f() { return this.passwordForm.controls; }


  password(): void {
    console.log()
    this.userService.actionSetPassword({oldPassword: this.f.oldPassword.value, newPassword: this.f.newPassword.value}).subscribe(value => {
      this.alertManagerManager.addAlert('done', 'alert-success');
      this.isSummited.emit(true);
    });
  }
}
