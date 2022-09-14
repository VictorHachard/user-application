import {Component} from '@angular/core';
import {ThemeService} from "../../../../../_services/_api/theme.service";
import {Theme} from "../../../../../_models/theme";
import {AlertManager} from "../../../../../_helpers/alert.manager";
import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-setting-themes',
  templateUrl: './setting-themes.component.html',
  styleUrls: ['./setting-themes.component.scss']
})
export class SettingThemesComponent {

  addThemeForm!: UntypedFormGroup;
  activeThemeForm!: UntypedFormGroup;
  alertManagerManager: AlertManager = new AlertManager();
  themeList!: Theme[];

  constructor(private themeService: ThemeService,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.themeService.getAllDto().subscribe(value => {
      this.themeList = value;
      for (let theme of this.themeList) {
        let imageStyle: string = <string>theme.image!;
        theme.image = this.sanitizer.bypassSecurityTrustHtml(imageStyle.replace('style=""', 'style="width: 100%"'));
      }
      this.addThemeForm = new UntypedFormGroup({
        name: new UntypedFormControl('', Validators.required),
        fileSource: new UntypedFormControl('#fffff', Validators.required),
        primaryColor: new UntypedFormControl('#fffff', Validators.required),
        secondaryColor: new UntypedFormControl('#fffff', Validators.required),
        tertiaryColor: new UntypedFormControl('#fffff', Validators.required),
        quaternaryColor: new UntypedFormControl('#fffff', Validators.required),
        primaryTextColor: new UntypedFormControl('#fffff', Validators.required),
        secondaryTextColor: new UntypedFormControl('#fffff', Validators.required)
      });
      this.activeThemeForm = new UntypedFormGroup({});
      for (let e of this.themeList!) {
        this.activeThemeForm.addControl('theme' + e.id!.toString(), new UntypedFormControl(e.active))
      }
    });
  }

  get f() { return this.addThemeForm.controls; }

  addTheme(): void {
    this.themeService.addTheme({
      name: this.f.name.value,
      primaryColor: this.f.primaryColor.value,
      secondaryColor: this.f.secondaryColor.value,
      tertiaryColor: this.f.tertiaryColor.value,
      quaternaryColor: this.f.quaternaryColor.value,
      primaryTextColor: this.f.primaryTextColor.value,
      secondaryTextColor: this.f.secondaryTextColor.value,
    }).subscribe(value => {
      this.alertManagerManager.addAlertIcon('addTheme');
      this.ngOnInit();
    });
  }

  activeTheme(id: number) {
    this.themeService.updateThemeActive(id, {active: this.activeThemeForm.get('theme' + id)!.value}).subscribe(value => {
      this.alertManagerManager.addAlertIcon('theme');
      this.ngOnInit();
    });
  }

  preview() {
    document.documentElement.style.setProperty('--primary-color', this.f.primaryColor.value);
    document.documentElement.style.setProperty('--secondary-color', this.f.secondaryColor.value);
    document.documentElement.style.setProperty('--tertiary-color', this.f.tertiaryColor.value);
    document.documentElement.style.setProperty('--quaternary-color', this.f.quaternaryColor.value);
    document.documentElement.style.setProperty('--primary-text-color', this.f.primaryTextColor.value);
    document.documentElement.style.setProperty('--secondary-text-color', this.f.secondaryTextColor.value);
  }
}
