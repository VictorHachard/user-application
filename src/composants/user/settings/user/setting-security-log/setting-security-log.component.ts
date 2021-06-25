import {Component, EventEmitter, Output} from '@angular/core';
import {AlertManager} from "../../../../../_helpers/alert.manager";
import {UserSecurity} from "../../../../../_models/user.security";
import {UserService} from "../../../../../_services/_api/user.service";
import {SecurityLogService} from "../../../../../_services/_api/security.log.service";
import {SecurityLog} from "../../../../../_models/security.log";

@Component({
  selector: 'app-setting-security-log',
  templateUrl: './setting-security-log.component.html',
  styleUrls: ['./setting-security-log.component.scss']
})
export class SettingSecurityLogComponent {

  alertManagerManager: AlertManager = new AlertManager();
  securityLogList!: SecurityLog[];
  pageIndex: number = 0;
  limit!: number;

  user!: UserSecurity;
  @Output() isSummited = new EventEmitter<boolean>();

  constructor(private userService: UserService, private securityLogService: SecurityLogService) { }

  ngOnInit(): void {
    this.securityLogService.count().subscribe(value => {
      this.limit = Math.floor(value / 10) - (value % 10 === 0 ? 1 : 0);
    });
    this.page(0)
  }

  page(number: number) {
    this.pageIndex += number;
    this.securityLogService.getAllDto(this.pageIndex).subscribe(value => {
      this.securityLogList = value;
    });
  }
}
