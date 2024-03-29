import {Component, EventEmitter, HostListener, Output} from '@angular/core';
import {UserSecurity} from "../../../../../_models/user.security";
import {AuthenticationService} from "../../../../../_services/authentication.service";
import {UserService} from "../../../../../_services/_api/user.service";
import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {AlertManager} from "../../../../../_helpers/alert.manager";

@Component({
  selector: 'app-setting-blocked-users',
  templateUrl: './setting-blocked-users.component.html',
  styleUrls: ['./setting-blocked-users.component.scss']
})
export class SettingBlockedUsersComponent {

  alertManagerManager: AlertManager = new AlertManager();
  user!: UserSecurity;
  userBlocked!: UserSecurity;
  @Output() isSummited = new EventEmitter<boolean>();

  proposal!: UserSecurity[];
  searchFormHeader!: UntypedFormGroup;

  constructor(private authenticationService: AuthenticationService, private userService: UserService) {
    this.authenticationService.currentUser.subscribe(x => {this.user = x; this.ngOnInit();});
  }

  ngOnInit(): void {
    this.searchFormHeader = new UntypedFormGroup({
      preference: new UntypedFormControl('', [Validators.required])
    });
  }

  get f() { return this.searchFormHeader.controls; }

  block(): void {
    this.userService.addBlockedUser(this.userBlocked.id!).subscribe(value => {
      this.alertManagerManager.addAlertIcon('addBlockedUser');
      this.isSummited.emit(true);
    });
  }

  inputChange($event: any): void {
    this.proposal = [];
    if (this.f.preference.value.length > 0) {
      this.userService.getAllBlockedUser(0, 10, 'username', 'asc', 'username', this.f.preference.value).subscribe(value => {
        this.proposal = value
      });
    }
  }

  select(user: UserSecurity): void {
    this.searchFormHeader.setValue({preference: user.username});
    this.userBlocked = user;
  }

  /**
   * Allow to click everywhere to close the dropdown.
   * @param event
   */
  @HostListener('document:click', ['$event'])
  documentClick(event: any): void {
    if (!(event.target as Element).className.includes('no-click-ish')) {
      this.proposal = [];
    }
  }

  removeBlockedUser(number: number): void {
    this.userService.removeBlockedUser(number).subscribe(value => {
      this.alertManagerManager.addAlertIcon('removeBlockedUser');
      this.isSummited.emit(true);
    });
  }
}
