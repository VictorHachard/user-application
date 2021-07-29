import {Component} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {AlertManager} from "../../../../../_helpers/alert.manager";
import {Setting} from "../../../../../_models/setting";
import {SettingService} from "../../../../../_services/_api/setting.service";

@Component({
  selector: 'app-setting-user-settings',
  templateUrl: './setting-user-settings.component.html',
  styleUrls: ['./setting-user-settings.component.scss']
})
export class SettingUserSettingsComponent {

  settingForm!: FormGroup;
  alertManagerManager: AlertManager = new AlertManager();
  settingList!: Setting[];

  constructor(private settingService: SettingService) { }

  ngOnInit(): void {
  }

}
