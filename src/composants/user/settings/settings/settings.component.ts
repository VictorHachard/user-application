import {Component, OnInit} from '@angular/core';
import {UserSecurity} from "../../../../_models/user.security";
import {AuthenticationService} from "../../../../_services/authentication.service";
import {ActivatedRoute} from "@angular/router";
import {environment} from "../../../../environments/environment";
import {SettingService} from "../../../../_services/_api/setting.service";
import {Theme} from "../../../../_models/theme";
import {Setting} from "../../../../_models/setting";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  apiResourceUrl = environment.apiResourceUrl

  user!: UserSecurity;
  param!: string | null;
  settingList!: any[];
  permissionList!: any[];

  constructor(private authenticationService: AuthenticationService,
              private route: ActivatedRoute,
              private settingService: SettingService) {
    this.authenticationService.currentUser.subscribe(x => {this.user = x;});
    this.permissionList = []
    for (let role of this.user.roleDtoList!) {
      this.permissionList.push(role.name);
    }
    this.route.paramMap.subscribe(params => {this.ngOnInit();});
    this.settingService.getAllActiveDto().subscribe(value => {
      this.settingList = [];
      for (const setting of value) {
        this.settingList.push(setting.name);
      }
    });
  }

  ngOnInit(): void {
    this.param = this.route.snapshot.paramMap.get('param');
    this.refresh(true);
  }

  refresh($event: boolean): void {
    if ($event) {this.authenticationService.updateUser().subscribe(value => {});}
  }
}
