// noinspection JSIgnoredPromiseFromCall

import {Component, OnInit} from '@angular/core';
import {AlertManager} from "../../../../_helpers/alert.manager";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../../_services/_api/user.service";
import {Utils} from "../../../../_helpers/utils";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  alertManagerManager!: AlertManager;
  resetForm!: FormGroup;

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.alertManagerManager = new AlertManager();
    this.resetForm = new FormGroup({
        password: new FormControl(!environment.production ? 'Test123*' : '', [Validators.required, Validators.pattern('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=*])(?=\\S+$).{6,}')]),
        password_confirm: new FormControl(!environment.production ? 'Test123*' : '', [Validators.required, Validators.pattern('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=*])(?=\\S+$).{6,}')])},
      { validators: Utils.matchPassword('password', 'password_confirm') });
  }

  get f() { return this.resetForm.controls; }

  reset(): void {
    console.log(this.route.snapshot.paramMap.get('token')!)
    this.userService.actionResetPassword({token: this.route.snapshot.paramMap.get('token')!, password: this.f.password.value}).subscribe(value => {
      this.alertManagerManager.addAlert('You password has been change', 'alert-success');
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);
    }, error => {
      this.alertManagerManager.addAlert(error.error.message, 'alert-danger');
    });
  }
}
