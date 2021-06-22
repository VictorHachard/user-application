import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AlertManager} from "../../../../_helpers/alert.manager";
import {UserSecurity} from "../../../../_models/user.security";
import {UserService} from "../../../../_services/_api/user.service";
import {SecurityLogService} from "../../../../_services/_api/security.log.service";
import {SecurityLog} from "../../../../_models/security.log";

@Component({
  selector: 'app-setting-security-log',
  templateUrl: './setting-security-log.component.html',
  styleUrls: ['./setting-security-log.component.css']
})
export class SettingSecurityLogComponent implements OnInit {

  alertManagerManager!: AlertManager;
  securityLogList!: SecurityLog[];

  user!: UserSecurity;
  @Output() isSummited = new EventEmitter<boolean>();

  constructor(private userService: UserService, private securityLogService: SecurityLogService) { }

  ngOnInit(): void {
    this.alertManagerManager = new AlertManager();
    this.securityLogService.getAllDto().subscribe(value => {
      this.securityLogList = value;
    });
  }

}