// noinspection JSIgnoredPromiseFromCall

import {Component, OnInit} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {AlertManager} from "../../../../_helpers/alert.manager";
import {UserService} from "../../../../_services/_api/user.service";
import {AuthenticationService} from "../../../../_services/authentication.service";
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  forgetForm!: UntypedFormGroup;
  alertManagerManager!: AlertManager;

  constructor(private userService: UserService,
              private authenticationService: AuthenticationService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.alertManagerManager = new AlertManager();
    this.forgetForm = new UntypedFormGroup({
      usernameOrEmail: new UntypedFormControl(!environment.production ? 'Paulin' : '', Validators.required),
      password: new UntypedFormControl('')
    });
  }

  get f() { return this.forgetForm.controls; }

  forget(): void {
    this.userService.actionForgetPassword(this.f.usernameOrEmail.value).subscribe(value => {
      this.alertManagerManager.addAlert('You will receive an email with instructions on how to reset your password in a few minutes', 'alert-success');
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);
    }, error => {
      this.alertManagerManager.addAlert(error.error.message, 'alert-danger'); //TODO better error handling
      this.alertManagerManager.addAlert('The username or email is incorrect', 'alert-danger');
    });
  }
}
