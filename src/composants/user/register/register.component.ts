// noinspection JSIgnoredPromiseFromCall

import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AlertManager} from "../../../_helpers/alert.manager";
import {UserService} from "../../../_services/_api/user.service";
import {AuthenticationService} from "../../../_services/authentication.service";
import {ActivatedRoute, Router} from "@angular/router";
import {first} from "rxjs/operators";
import {Utils} from "../../../_helpers/utils";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent  implements OnInit {

  private default = {
    username: 'Paulin',
    email: 'test@test.test',
    password: 'Test123*',
  };

  registerForm!: FormGroup;
  alertManagerManager!: AlertManager;

  constructor(private userService: UserService,
              private authenticationService: AuthenticationService,
              private route: ActivatedRoute,
              private router: Router) {
    console.log(this.authenticationService.currentUserValue)
    if (this.authenticationService.currentUserValue) {
      this.router.navigate([this.route.snapshot.queryParams['returnUrl'] || '/']);
    }
  }

  ngOnInit(): void {
    this.alertManagerManager = new AlertManager();
    this.registerForm = new FormGroup({
        username: new FormControl(!environment.production ? this.default.username : '', Validators.required),
        email: new FormControl(!environment.production ? this.default.email : '', [Validators.required, Validators.email]),
        password: new FormControl(!environment.production ? this.default.password : '', [Validators.required, Validators.pattern('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=*])(?=\\S+$).{6,}')]),
        password_confirm: new FormControl(!environment.production ? this.default.password : '', [Validators.required, Validators.pattern('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=*])(?=\\S+$).{6,}')])},
      { validators: Utils.matchPassword('password', 'password_confirm')
    });
  }

  get f() { return this.registerForm.controls; }

  register(): void {
    this.authenticationService.register(this.f.username.value, this.f.email.value, this.f.password.value).pipe(first()).subscribe(value => {
      this.router.navigate([this.route.snapshot.queryParams['returnUrl'] || '/']);
    }, error => {
      this.alertManagerManager.addAlert('The user already exists', 'alert-danger');
    });
  }


}

