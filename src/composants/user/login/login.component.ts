// noinspection JSIgnoredPromiseFromCall

import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Component, OnInit} from '@angular/core';
import {AlertManager} from "../../../_helpers/alert.manager";
import {UserService} from "../../../_services/_api/user.service";
import {AuthenticationService} from "../../../_services/authentication.service";
import {first} from "rxjs/operators";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  alertManagerManager!: AlertManager;

  constructor(private userService: UserService,
              private authenticationService: AuthenticationService,
              private route: ActivatedRoute,
              private router: Router) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate([this.route.snapshot.queryParams['returnUrl'] || '/']);
    }
  }

  ngOnInit(): void {
    this.alertManagerManager = new AlertManager();
    this.loginForm = new FormGroup({
      username: new FormControl(!environment.production ? 'Paulin' : '', Validators.required),
      password: new FormControl(!environment.production ? 'Test123*' : '', Validators.required),
      rememberMe: new FormControl(false)
    });
  }

  get f() { return this.loginForm.controls; }

  login(): void {
    this.authenticationService.login(btoa(this.f.username.value + ":" + this.f.password.value), this.f.rememberMe.value, '').pipe(first()).subscribe(value => {
        this.router.navigate([this.route.snapshot.queryParams['returnUrl'] || '/']);
    }, error => {
      if (error.includes('2FA')) {
        this.router.navigate(['/two-factor'], {queryParams: {auth: btoa(this.f.username.value + ":" + this.f.password.value), rememberMe: this.f.rememberMe.value}});
      } else {
        this.alertManagerManager.addAlert('The username or password is incorrect' + error, 'alert-danger');
      }
    });
  }
}
