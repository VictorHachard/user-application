import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AlertManager} from "../../../../_helpers/alert.manager";
import {UserSecurity} from "../../../../_models/user.security";
import {UserService} from "../../../../_services/_api/user.service";
import {environment} from "../../../../environments/environment";
import {Utils} from "../../../../_helpers/utils";

@Component({
  selector: 'app-setting-security',
  templateUrl: './setting-security.component.html',
  styleUrls: ['./setting-security.component.css']
})
export class SettingSecurityComponent implements OnInit {

  passwordForm!: FormGroup;
  twoFactorForm!: FormGroup;
  alertManagerManager!: AlertManager;

  @Input() user!: UserSecurity;
  @Output() isSummited = new EventEmitter<boolean>();

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.alertManagerManager = new AlertManager();
    this.passwordForm = new FormGroup({
        oldPassword: new FormControl('', [Validators.required, Validators.pattern('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=*])(?=\\S+$).{6,}')]),
        newPassword: new FormControl('', [Validators.required, Validators.pattern('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=*])(?=\\S+$).{6,}')]),
        newPasswordConfirm: new FormControl('', [Validators.required, Validators.pattern('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=*])(?=\\S+$).{6,}')])},
      { validators: Utils.matchPassword('newPassword', 'newPasswordConfirm')
    });
  }

  get f() { return this.passwordForm.controls; }

  theme(): void {

  }

  password(): void {

  }
}
