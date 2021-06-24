import {Component} from '@angular/core';
import {AuthenticationService} from "../../../../../_services/authentication.service";
import {UserService} from "../../../../../_services/_api/user.service";
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

  constructor(private authenticationService: AuthenticationService,
              private userService: UserService,
              private themeService: ThemeService,
              private imageService: ImageService) {

  }

  ngOnInit(): void {
    this.themeService.getAllDto().subscribe(value => {
      this.themeList = value;
      this.trustedUrl = undefined;
      this.addThemeForm = new FormGroup({
        name: new FormControl('', Validators.required),
        fileSource: new FormControl('', Validators.required)
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
        imageUrl: name
      }).subscribe(value => {
        this.alertManagerManager.addAlertIcon('theme');
        this.ngOnInit();
      });
    });
  }

  activeTheme(id: number) {
    this.themeService.updateThemeActive(id, {active: this.activeThemeForm.get('theme' + id)!.value}).subscribe(value => {
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
}
