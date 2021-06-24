// noinspection JSIgnoredPromiseFromCall

import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
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

  forgetForm!: FormGroup;
  alertManagerManager!: AlertManager;

  constructor(private userService: UserService,
              private authenticationService: AuthenticationService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.alertManagerManager = new AlertManager();
    this.forgetForm = new FormGroup({
      username: new FormControl(!environment.production ? 'Paulin' : '', Validators.required),
      password: new FormControl('')
    });
  }

  get f() { return this.forgetForm.controls; }

  forget(): void {
    this.userService.actionForgetPassword(this.f.username.value).subscribe(value => {
      this.router.navigate(['/login']);
    }, error => {
      this.alertManagerManager.addAlert('The username is incorrect', 'alert-danger');
    });
  }
}
