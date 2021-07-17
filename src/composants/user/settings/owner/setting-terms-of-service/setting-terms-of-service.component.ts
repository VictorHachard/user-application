import {Component, OnInit} from '@angular/core';
import {AlertManager} from "../../../../../_helpers/alert.manager";

@Component({
  selector: 'app-setting-terms-of-service',
  templateUrl: './setting-terms-of-service.component.html',
  styleUrls: ['./setting-terms-of-service.component.scss']
})
export class SettingTermsOfServiceComponent {

  alertManagerManager: AlertManager = new AlertManager();

  constructor() { }

  ngOnInit(): void {
  }

}
