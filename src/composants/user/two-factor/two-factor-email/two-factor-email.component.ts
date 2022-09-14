// noinspection JSIgnoredPromiseFromCall

import {Component, Input, OnInit} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {AlertManager} from "../../../../_helpers/alert.manager";
import {AuthenticationService} from "../../../../_services/authentication.service";
import {UserService} from "../../../../_services/_api/user.service";
import {first} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-two-factor-email',
  templateUrl: './two-factor-email.component.html',
  styleUrls: ['./two-factor-email.component.scss']
})
export class TwoFactorEmailComponent implements OnInit {

  twoFactorEmailForm!: UntypedFormGroup;
  alertManagerManager: AlertManager = new AlertManager();
  @Input() queryParams!: any;

  constructor(private authenticationService: AuthenticationService,
              private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) {
    this.queryParams = this.route.snapshot.queryParams;
  }

  ngOnInit(): void {
    this.twoFactorEmailForm = new UntypedFormGroup({
      code: new UntypedFormControl('', [Validators.required, Validators.pattern('^[0-9]{6}$')])
    });
  }

  get f() { return this.twoFactorEmailForm.controls; }

  twoFactorEmail(): void {
    this.authenticationService.login(this.queryParams.auth, this.queryParams.rememberMe, this.f.code.value).pipe(first()).subscribe(value => {
      this.router.navigate(['/']);
    }, error => {
      this.alertManagerManager.addAlert(error, 'alert-danger');
    });
  }
}
