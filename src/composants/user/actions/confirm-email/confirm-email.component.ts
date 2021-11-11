// noinspection JSIgnoredPromiseFromCall

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AlertManager} from "../../../../_helpers/alert.manager";
import {UserService} from "../../../../_services/_api/user.service";
import {EmailService} from "../../../../_services/_api/email.service";

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss']
})
export class ConfirmEmailComponent implements OnInit {

  alertManagerManager!: AlertManager;

  constructor(private emailService: EmailService,
              private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.alertManagerManager = new AlertManager();
    this.emailService.confirm(this.route.snapshot.paramMap.get('token')!).subscribe(value => {
      this.alertManagerManager.addAlert('You account has been validated', 'alert-success');
      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 2000);
    }, error => {
      this.alertManagerManager.addAlert(error.error.message, 'alert-danger'); //TODO better error handling
    });
  }

}
