import {ChangeDetectorRef, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AlertManager} from "../../../../_helpers/alert.manager";
import {UserSecurity} from "../../../../_models/user.security";
import {UserService} from "../../../../_services/_api/user.service";
import {environment} from "../../../../environments/environment";
import {AuthenticationService} from "../../../../_services/authentication.service";

@Component({
  selector: 'app-setting-emails',
  templateUrl: './setting-emails.component.html',
  styleUrls: ['./setting-emails.component.css']
})
export class SettingEmailsComponent implements OnInit {

  addEmailForm!: FormGroup;
  primaryEmailForm!: FormGroup;
  alertManagerManager!: AlertManager;
  _reload = true;

  user!: UserSecurity;
  @Output() isSummited = new EventEmitter<boolean>();

  constructor(private authenticationService: AuthenticationService, private userService: UserService, private cdr: ChangeDetectorRef) {
    this.authenticationService.currentUser.subscribe(x => {this.user = x; this.ngOnInit();});
  }

  ngOnInit(): void {
    this.alertManagerManager = new AlertManager();
    this.addEmailForm = new FormGroup({
      email: new FormControl(!environment.production ? 'test1@test.test' : '', [Validators.required, Validators.email])
    });
    this.primaryEmailForm = new FormGroup({
      email: new FormControl(this.user.emailList!.filter(e => e.priority === 'PRINCIPAL')[0].email, [Validators.required])
    });
    this.reload(); //TODO find better way
  }

  private reload() {
    setTimeout(() => this._reload = false);
    setTimeout(() => this._reload = true);
  }

  get f() { return this.addEmailForm.controls; }

  get fPrimary() { return this.primaryEmailForm.controls; }

  addEmail(): void {
    this.userService.addEmail({email: this.f.email.value}).subscribe(value => {
      this.isSummited.emit(true);
    });
  }

  primaryEmail(): void {
    this.userService.updateEmailPriority({email: this.fPrimary.email.value}).subscribe(value => {
      this.isSummited.emit(true);
    });
  }

  removeEmail(id: number): void {
    this.userService.deleteEmail(id).subscribe(value => {
      this.isSummited.emit(true);
    });
  }

  resendEmail(id: number): void {
    this.userService.actionConfirmResendEmail(id).subscribe(value => {
      this.isSummited.emit(true);
    });
  }
}
