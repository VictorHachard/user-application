import {ChangeDetectorRef, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AlertManager} from "../../../../_helpers/alert.manager";
import {UserSecurity} from "../../../../_models/user.security";
import {UserService} from "../../../../_services/_api/user.service";
import {AuthenticationService} from "../../../../_services/authentication.service";

@Component({
  selector: 'app-setting-profile',
  templateUrl: './setting-profile.component.html',
  styleUrls: ['./setting-profile.component.css']
})
export class SettingProfileComponent implements OnInit {

  profileForm!: FormGroup;
  alertManagerManager!: AlertManager;
  _reload = true;

  user!: UserSecurity;
  @Output() isSummited = new EventEmitter<boolean>();

  constructor(private authenticationService: AuthenticationService, private userService: UserService, private cdr: ChangeDetectorRef) {
    this.authenticationService.currentUser.subscribe(x => {this.user = x; this.ngOnInit();});
  }

  ngOnInit(): void {
    this.alertManagerManager = new AlertManager();
    this.profileForm = new FormGroup({
      firstName: new FormControl(this.user.firstName),
      middleName: new FormControl(this.user.middleName),
      lastName: new FormControl(this.user.lastName),
      biography: new FormControl(this.user.biography),
      url: new FormControl(this.user.url)
    });
  }

  get f() { return this.profileForm.controls; }

  profile(): void {
    this.userService.updateProfile({firstName: this.f.firstName.value, middleName: this.f.middleName.value, lastName: this.f.lastName.value, biography: this.f.biography.value, url: this.f.url.value}).subscribe(value => {
      this.isSummited.emit(true);
    });
  }
}
