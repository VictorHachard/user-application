import {Component} from '@angular/core';
import {ThemeService} from "../../../../../_services/_api/theme.service";
import {Theme} from "../../../../../_models/theme";
import {AlertManager} from "../../../../../_helpers/alert.manager";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ImageService} from "../../../../../_services/_api/image.service";

@Component({
  selector: 'app-setting-themes',
  templateUrl: './setting-themes.component.html',
  styleUrls: ['./setting-themes.component.scss']
})
export class SettingThemesComponent {

  addThemeForm!: FormGroup;
  activeThemeForm!: FormGroup;
  alertManagerManager: AlertManager = new AlertManager();
  themeList!: Theme[];
  trustedUrl: any;

  constructor(private themeService: ThemeService,
              private imageService: ImageService) {
  }

  ngOnInit(): void {
    this.themeService.getAllDto().subscribe(value => {
      this.themeList = value;
      this.trustedUrl = undefined;
      this.addThemeForm = new FormGroup({
        name: new FormControl('', Validators.required),
        fileSource: new FormControl('#fffff', Validators.required),
        primaryColor: new FormControl('#fffff', Validators.required),
        secondaryColor: new FormControl('#fffff', Validators.required),
        tertiaryColor: new FormControl('#fffff', Validators.required),
        quaternaryColor: new FormControl('#fffff', Validators.required),
        primaryTextColor: new FormControl('#fffff', Validators.required),
        secondaryTextColor: new FormControl('#fffff', Validators.required)
      });
      this.activeThemeForm = new FormGroup({});
      for (let e of this.themeList!) {
        this.activeThemeForm.addControl('theme' + e.id!.toString(), new FormControl(e.active))
      }
    });
  }

  get f() { return this.addThemeForm.controls; }

  addTheme(): void {
    const formData: FormData = new FormData();
    const name: string = (new Date()).valueOf().toString() + Math.random().toString(36).substring(10) + this.f.fileSource.value.name.slice(this.f.fileSource.value.name.lastIndexOf('.'));
    formData.append('file', this.f.fileSource.value, name);
    this.imageService.upload(formData).subscribe(value1 => {
      this.themeService.addTheme({
        name: this.f.name.value,
        imageUrl: name,
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
    });
  }

  activeTheme(id: number) {
    this.themeService.updateThemeActive(id, {active: this.activeThemeForm.get('theme' + id)!.value}).subscribe(value => {
      this.alertManagerManager.addAlertIcon('theme');
      this.ngOnInit();
    });
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      const file: File = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.trustedUrl = event.target.result;
      };
      reader.readAsDataURL(file);
      this.addThemeForm.patchValue({
        fileSource: file
      });
    }
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
