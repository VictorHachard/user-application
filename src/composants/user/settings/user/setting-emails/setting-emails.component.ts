import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AlertManager} from "../../../../../_helpers/alert.manager";
import {UserSecurity} from "../../../../../_models/user.security";
import {UserService} from "../../../../../_services/_api/user.service";
import {environment} from "../../../../../environments/environment";
import {AuthenticationService} from "../../../../../_services/authentication.service";
import {EmailService} from "../../../../../_services/_api/email.service";

@Component({
  selector: 'app-setting-emails',
  templateUrl: './setting-emails.component.html',
  styleUrls: ['./setting-emails.component.scss']
})
export class SettingEmailsComponent {

  addEmailForm!: FormGroup;
  primaryEmailForm!: FormGroup;
  backupEmailForm!: FormGroup;
  emailPreference!: FormGroup;
  alertManagerManager: AlertManager = new AlertManager();
  _reload = true;

  user!: UserSecurity;
  @Output() isSummited = new EventEmitter<boolean>();

  constructor(private emailService: EmailService,
              private authenticationService: AuthenticationService,
              private userService: UserService) {
    this.authenticationService.currentUser.subscribe(x => {this.user = x; this.ngOnInit();});
  }

  ngOnInit(): void {
    this.addEmailForm = new FormGroup({
      email: new FormControl(!environment.production ? 'test1@test.test' : '', [Validators.required, Validators.email])
    });
    this.primaryEmailForm = new FormGroup({
      email: new FormControl(this.user.emailList!.filter(e => e.priority === 'PRIMARY')[0].email, [Validators.required])
    });
    this.emailPreference = new FormGroup({
      preference: new FormControl(this.user.emailPreferences, [Validators.required])
    });
    this.backupEmailForm = new FormGroup({});
    for (let e of this.user!.emailList!) {
      this.backupEmailForm.addControl('email' + e.id!.toString(), new FormControl(e.backup))
    }
    this.reload(); //TODO find better way
  }

  private reload() {
    setTimeout(() => this._reload = false);
    setTimeout(() => this._reload = true);
  }

  get f() { return this.addEmailForm.controls; }

  get fPrimary() { return this.primaryEmailForm.controls; }

  addEmail(): void {
    this.emailService.create({email: this.f.email.value}).subscribe(value => {
      this.alertManagerManager.addAlertIcon('addEmail');
      this.isSummited.emit(true);
    }, error => {
      this.alertManagerManager.addAlert('The email already exists', 'alert-danger');
    });
  }

  primaryEmail($event: any): void {
    this.emailService.updatePriority({email: this.fPrimary.email.value}).subscribe(value => {
      this.alertManagerManager.addAlertIcon('primaryEmail');
      this.isSummited.emit(true);
    }, error => {
      this.alertManagerManager.addAlert('The email need to be confirmed', 'alert-danger');
    });
  }

  removeEmail(id: number): void {
    this.emailService.delete(id).subscribe(value => {
      this.isSummited.emit(true);
    });
  }

  resendEmail(id: number): void {
    this.emailService.confirmResend(id).subscribe(value => {
      this.isSummited.emit(true);
    });
  }

  preferences(id: string) {
    this.emailService.updatePreferences({emailPreferences: id}).subscribe(value => {
      this.alertManagerManager.addAlertIcon('preferences');
      this.isSummited.emit(true);
    });
  }

  backupEmail(id: any) {
    this.emailService.updateBackup(id, {backup: this.backupEmailForm.get('email' + id)!.value}).subscribe(value => {
      this.isSummited.emit(true);
    });
  }
}
