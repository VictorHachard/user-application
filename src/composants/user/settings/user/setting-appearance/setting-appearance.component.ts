import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AlertManager} from "../../../../../_helpers/alert.manager";
import {UserSecurity} from "../../../../../_models/user.security";
import {UserService} from "../../../../../_services/_api/user.service";
import {AuthenticationService} from "../../../../../_services/authentication.service";
import {ThemeService} from "../../../../../_services/_api/theme.service";
import {Theme} from "../../../../../_models/theme";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

@Component({
  selector: 'app-setting-appearance',
  templateUrl: './setting-appearance.component.html',
  styleUrls: ['./setting-appearance.component.scss']
})
export class SettingAppearanceComponent {

  themeForm!: FormGroup;
  alertManagerManager: AlertManager = new AlertManager();
  themeList!: Theme[];
  _reload = true;
  value!: number | undefined;

  user!: UserSecurity;
  @Output() isSummited = new EventEmitter<boolean>();

  constructor(private authenticationService: AuthenticationService,
              private userService: UserService,
              private themeService: ThemeService,
              private sanitizer: DomSanitizer) {
    this.authenticationService.currentUser.subscribe(x => {this.user = x; this.ngOnInit();});
    this.themeService.getAllActiveDto().subscribe(value => {
      this.themeList = value;
      for (let theme of this.themeList) {
        let imageStyle: string = <string>theme.image!;
        theme.image = this.sanitizer.bypassSecurityTrustHtml(imageStyle.replace('style=""', 'style="width: 100%;border-top-left-radius: 0.18rem;border-top-right-radius: 0.18rem"'));
      }
    });
  }

  ngOnInit(): void {
    this.value = this.user.themeSimplifiedDto?.id;
    this.themeForm = new FormGroup({
      id: new FormControl(this.user.themeSimplifiedDto?.id, Validators.required)
    });
  }

  get f() { return this.themeForm.controls; }

  theme(id: any): void {
    this.userService.updateAppearance(id).subscribe(value => {
      this.alertManagerManager.addAlertIcon('theme');
      this.isSummited.emit(true);
    }, error => {

    });
  }
}
