import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AlertManager} from "../../../../_helpers/alert.manager";
import {UserSecurity} from "../../../../_models/user.security";
import {UserService} from "../../../../_services/_api/user.service";

@Component({
  selector: 'app-setting-appearance',
  templateUrl: './setting-appearance.component.html',
  styleUrls: ['./setting-appearance.component.css']
})
export class SettingAppearanceComponent implements OnInit {

  themeForm!: FormGroup;
  alertManagerManager!: AlertManager;

  @Input() user!: UserSecurity;
  @Output() isSummited = new EventEmitter<boolean>();

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.alertManagerManager = new AlertManager();
    this.themeForm = new FormGroup({
      username: new FormControl(this.user.username, Validators.required)
    });
  }

  get f() { return this.themeForm.controls; }

  theme(): void {

  }
}
