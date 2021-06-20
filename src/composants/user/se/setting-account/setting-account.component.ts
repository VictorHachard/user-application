import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AlertManager} from "../../../../_helpers/alert.manager";
import {environment} from "../../../../environments/environment";
import {Utils} from "../../../../_helpers/utils";
import {UserSecurity} from "../../../../_models/user.security";
import {UserService} from "../../../../_services/_api/user.service";

@Component({
  selector: 'app-setting-account',
  templateUrl: './setting-account.component.html',
  styleUrls: ['./setting-account.component.css']
})
export class SettingAccountComponent implements OnInit {

  usernameForm!: FormGroup;
  deleteForm!: FormGroup;
  alertManagerManager!: AlertManager;

  @Input() user!: UserSecurity;
  @Output() isSummited = new EventEmitter<boolean>();

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.alertManagerManager = new AlertManager();
    this.usernameForm = new FormGroup({
        username: new FormControl(this.user.username, Validators.required)
    });
    this.deleteForm = new FormGroup({});
  }

  get f() { return this.usernameForm.controls; }

  username(): void {

  }

  delete(): void {

  }
}
