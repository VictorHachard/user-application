import {Component, OnInit} from '@angular/core';
import {UserSecurity} from "../../../../_models/user.security";
import {AuthenticationService} from "../../../../_services/authentication.service";
import {ActivatedRoute} from "@angular/router";
import {environment} from "../../../../environments/environment";
import {SettingService} from "../../../../_services/_api/setting.service";
import {Theme} from "../../../../_models/theme";
import {Setting} from "../../../../_models/setting";
import {ImageService} from "../../../../_services/_api/image.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  user!: UserSecurity;
  param!: string | null;
  settingList!: any[];
  permissionList!: any[];
  imageUrl!: any;

  constructor(private authenticationService: AuthenticationService,
              private route: ActivatedRoute,
              private imageService: ImageService,
              private sanitizer: DomSanitizer,
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
    if (this.user.profileImage) {
      this.imageService.get(this.user.profileImage!).subscribe(value => {
        this.imageUrl = this.sanitizer.bypassSecurityTrustUrl('data:image;base64,' + value.content);
      });
    }
  }

  ngOnInit(): void {
    this.param = this.route.snapshot.paramMap.get('param');
    this.refresh(true);
  }

  refresh($event: boolean): void {
    if ($event) {this.authenticationService.reloadUser().subscribe(value => {});}
  }
}
