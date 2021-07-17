import {Component, OnInit} from '@angular/core';
import {AlertManager} from "../../../_helpers/alert.manager";
import {UserService} from "../../../_services/_api/user.service";
import {AuthenticationService} from "../../../_services/authentication.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  alertManagerManager!: AlertManager;

  constructor(private userService: UserService,
              private authenticationService: AuthenticationService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.alertManagerManager = new AlertManager();
  }

}
