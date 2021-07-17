import {Component, OnInit} from '@angular/core';
import {AlertManager} from "../../../../../_helpers/alert.manager";

@Component({
  selector: 'app-setting-privacy',
  templateUrl: './setting-privacy.component.html',
  styleUrls: ['./setting-privacy.component.scss']
})
export class SettingPrivacyComponent {

  alertManagerManager: AlertManager = new AlertManager();

  constructor() { }

  ngOnInit(): void {
  }

}
