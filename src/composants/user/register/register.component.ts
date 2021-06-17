// noinspection JSIgnoredPromiseFromCall

import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {AlertManager} from "../../../_helpers/alert.manager";
import {UserService} from "../../../_services/_api/user.service";
import {AuthenticationService} from "../../../_services/authentication.service";
import {ActivatedRoute, Router} from "@angular/router";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  implements OnInit {
  private debug = true;
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
        username: new FormControl(this.debug ? this.default.username : '', Validators.required),
        email: new FormControl(this.debug ? this.default.email : '', [Validators.required, Validators.email]),
        password: new FormControl(this.debug ? this.default.password : '', [Validators.required, Validators.pattern('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=*])(?=\\S+$).{6,}')]),
        password_confirm: new FormControl(this.debug ? this.default.password : '', [Validators.required, Validators.pattern('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=*])(?=\\S+$).{6,}')])},
      { validators: this.matchPassword('password', 'password_confirm')
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

  private matchPassword(firstControl: string, secondControl: string): any {
    // @ts-ignore //TODO edit this fuck ?????
    return (control: FormGroup): { [key: string]: boolean } | null => {
      if (control.get(firstControl)?.value !== control.get(secondControl)?.value) {
        const err = {noMatch: true};
        control.get(firstControl)?.setErrors(err);
        return err;
      } else {
        const noMatchError = control.get(firstControl)?.hasError('noMatch');
        if (noMatchError) {
          delete control.get(firstControl)?.errors?.noMatch;
          control.get(firstControl)?.updateValueAndValidity();
        }
      }
    };
  }
}

