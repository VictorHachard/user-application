import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AlertManager} from "../../../../../_helpers/alert.manager";
import {UserSecurity} from "../../../../../_models/user.security";
import {UserService} from "../../../../../_services/_api/user.service";
import {AuthenticationService} from "../../../../../_services/authentication.service";
import {ImageService} from "../../../../../_services/_api/image.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-setting-profile',
  templateUrl: './setting-profile.component.html',
  styleUrls: ['./setting-profile.component.scss']
})
export class SettingProfileComponent {

  profileForm!: FormGroup;
  privacyForm!: FormGroup;
  alertManagerManager: AlertManager = new AlertManager();
  _reload = true;
  trustedUrl: any;
  param!: string | null;

  user!: UserSecurity;
  @Output() isSummited = new EventEmitter<boolean>();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService,
              private userService: UserService,
              private imageService: ImageService) {
    this.authenticationService.currentUser.subscribe(x => {this.user = x; this.ngOnInit();});
  }

  ngOnInit(): void {
    this.param = this.route.snapshot.paramMap.get('param');
    this.profileForm = new FormGroup({
      firstName: new FormControl(this.user.firstName),
      middleName: new FormControl(this.user.middleName),
      lastName: new FormControl(this.user.lastName),
      biography: new FormControl(this.user.biography),
      url: new FormControl(this.user.url),
      fileSource: new FormControl('')
    });
    this.privacyForm = new FormGroup({
      privacy: new FormControl(this.user.privacy, [Validators.required])
    });
  }

  get f() { return this.profileForm.controls; }

  profile(): void {
    if (this.f.fileSource.value) {
      const formData: FormData = new FormData();
      const name: string = (new Date()).valueOf().toString() + Math.random().toString(36).substring(10) + this.f.fileSource.value.name.slice(this.f.fileSource.value.name.lastIndexOf('.'));
      formData.append('file', this.f.fileSource.value, name);
      this.imageService.upload(formData).subscribe(value1 => {
        this.profileUp(name);
      });
    } else {
      this.profileUp('');
    }
  }

  private profileUp(profileImage: string) {
    this.userService.updateProfile({
      firstName: this.f.firstName.value,
      middleName: this.f.middleName.value,
      lastName: this.f.lastName.value,
      biography: this.f.biography.value,
      url: this.f.url.value,
      profileImage: profileImage
    }).subscribe(value => {
      this.alertManagerManager.addAlertIcon('profile');
      this.isSummited.emit(true);
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
      this.profileForm.patchValue({
        fileSource: file
      });
    }
  }

  privacy(id: string) {
    this.userService.updateProfilePrivacy({profilePrivacy: id}).subscribe(value => {
      this.alertManagerManager.addAlertIcon('privacy');
      this.isSummited.emit(true);
    });
  }
}
