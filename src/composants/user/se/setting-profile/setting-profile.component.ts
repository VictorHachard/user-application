import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AlertManager} from "../../../../_helpers/alert.manager";
import {UserSecurity} from "../../../../_models/user.security";
import {UserService} from "../../../../_services/_api/user.service";
import {AuthenticationService} from "../../../../_services/authentication.service";
import {ImageService} from "../../../../_services/_api/image.service";

@Component({
  selector: 'app-setting-profile',
  templateUrl: './setting-profile.component.html',
  styleUrls: ['./setting-profile.component.css']
})
export class SettingProfileComponent implements OnInit {

  profileForm!: FormGroup;
  alertManagerManager!: AlertManager;
  _reload = true;
  trustedUrl: any;

  user!: UserSecurity;
  @Output() isSummited = new EventEmitter<boolean>();

  constructor(private authenticationService: AuthenticationService, private userService: UserService, private imageService: ImageService) {
    this.authenticationService.currentUser.subscribe(x => {this.user = x; this.ngOnInit();});
  }

  ngOnInit(): void {
    this.alertManagerManager = new AlertManager();
    this.profileForm = new FormGroup({
      firstName: new FormControl(this.user.firstName),
      middleName: new FormControl(this.user.middleName),
      lastName: new FormControl(this.user.lastName),
      biography: new FormControl(this.user.biography),
      url: new FormControl(this.user.url),
      fileSource: new FormControl('', )
    });
  }

  get f() { return this.profileForm.controls; }

  profile(): void {
    const formData: FormData = new FormData();
    const name: string = (new Date()).valueOf().toString() + Math.random().toString(36).substring(10) + this.f.fileSource.value.name.slice(this.f.fileSource.value.name.lastIndexOf('.'));
    formData.append('file', this.f.fileSource.value, name);
    this.imageService.upload(formData).subscribe(value1 => {
      this.userService.updateProfile({
        firstName: this.f.firstName.value,
        middleName: this.f.middleName.value,
        lastName: this.f.lastName.value,
        biography: this.f.biography.value,
        url: this.f.url.value,
        profileImageUrl: name
      }).subscribe(value => {
        this.isSummited.emit(true);
      });
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

}
