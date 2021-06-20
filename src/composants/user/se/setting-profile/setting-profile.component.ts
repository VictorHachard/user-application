import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AlertManager} from "../../../../_helpers/alert.manager";
import {UserSecurity} from "../../../../_models/user.security";
import {UserService} from "../../../../_services/_api/user.service";

@Component({
  selector: 'app-setting-profile',
  templateUrl: './setting-profile.component.html',
  styleUrls: ['./setting-profile.component.css']
})
export class SettingProfileComponent implements OnInit {

  profileForm!: FormGroup;
  alertManagerManager!: AlertManager;

  @Input() user!: UserSecurity;
  @Output() isSummited = new EventEmitter<boolean>();

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.alertManagerManager = new AlertManager();
    this.profileForm = new FormGroup({
      username: new FormControl(this.user.username, Validators.required)
    });
  }

  get f() { return this.profileForm.controls; }

  profile(): void {

  }
}
