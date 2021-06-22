import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AlertManager} from "../../../../_helpers/alert.manager";
import {UserSecurity} from "../../../../_models/user.security";
import {UserService} from "../../../../_services/_api/user.service";
import {AuthenticationService} from "../../../../_services/authentication.service";
import {ThemeService} from "../../../../_services/_api/theme.service";
import {Theme} from "../../../../_models/theme";

@Component({
  selector: 'app-setting-appearance',
  templateUrl: './setting-appearance.component.html',
  styleUrls: ['./setting-appearance.component.css']
})
export class SettingAppearanceComponent {

  themeForm!: FormGroup;
  alertManagerManager!: AlertManager;
  themeList!: Theme[];
  _reload = true;
  value!: number | undefined;

  user!: UserSecurity;
  @Output() isSummited = new EventEmitter<boolean>();

  constructor(private authenticationService: AuthenticationService, private userService: UserService, private themeService: ThemeService) {
    this.authenticationService.currentUser.subscribe(x => {this.user = x; this.ngOnInit();});
    this.themeService.getAllDto().subscribe(value => {
      this.themeList = value;
    });
  }

  ngOnInit(): void {
    this.alertManagerManager = new AlertManager();
    console.log(this.user)
    this.value = this.user.themeSimplifiedDto?.id;
    this.themeForm = new FormGroup({
      id: new FormControl(this.user.themeSimplifiedDto?.id, Validators.required)
    });
  }

  get f() { return this.themeForm.controls; }

  theme(id: any): void {
    this.userService.updateAppearance(id).subscribe(value => {
      this.isSummited.emit(true);
    });
  }
}
