import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserSecurity} from "../../../../../../_models/user.security";
import {AuthenticationService} from "../../../../../../_services/authentication.service";
import {UserService} from "../../../../../../_services/_api/user.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-setting-cookies-authentication',
  templateUrl: './setting-cookies-authentication.component.html',
  styleUrls: ['./setting-cookies-authentication.component.scss']
})
export class SettingCookiesAuthenticationComponent {

  cookieAuthenticationForm!: FormGroup;
  user!: UserSecurity;
  @Output() isSummited = new EventEmitter<boolean>();

  constructor(private authenticationService: AuthenticationService, private userService: UserService) {
    this.authenticationService.currentUser.subscribe(x => {this.user = x; this.ngOnInit();});
  }

  ngOnInit(): void {
    this.cookieAuthenticationForm = new FormGroup({
      username: new FormControl(this.user.username, Validators.required)
    });
  }

  get f() { return this.cookieAuthenticationForm.controls; }

}
