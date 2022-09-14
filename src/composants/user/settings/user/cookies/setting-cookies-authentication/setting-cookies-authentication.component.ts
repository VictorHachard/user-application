import {Component, EventEmitter, Output} from '@angular/core';
import {UserSecurity} from "../../../../../../_models/user.security";
import {AuthenticationService} from "../../../../../../_services/authentication.service";
import {UserService} from "../../../../../../_services/_api/user.service";
import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-setting-cookies-authentication',
  templateUrl: './setting-cookies-authentication.component.html',
  styleUrls: ['./setting-cookies-authentication.component.scss']
})
export class SettingCookiesAuthenticationComponent {

  cookieAuthenticationForm!: UntypedFormGroup;
  user!: UserSecurity;
  @Output() isSummited = new EventEmitter<boolean>();

  constructor(private authenticationService: AuthenticationService, private userService: UserService) {
    this.authenticationService.currentUser.subscribe(x => {this.user = x; this.ngOnInit();});
  }

  ngOnInit(): void {
    this.cookieAuthenticationForm = new UntypedFormGroup({
      username: new UntypedFormControl(this.user.username, Validators.required)
    });
  }

  get f() { return this.cookieAuthenticationForm.controls; }

}
