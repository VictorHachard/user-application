import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AlertManager} from "../../../../_helpers/alert.manager";
import {UserSecurity} from "../../../../_models/user.security";
import {UserService} from "../../../../_services/_api/user.service";
import {Utils} from "../../../../_helpers/utils";

@Component({
  selector: 'app-setting-emails',
  templateUrl: './setting-emails.component.html',
  styleUrls: ['./setting-emails.component.css']
})
export class SettingEmailsComponent implements OnInit {

  addEmailForm!: FormGroup;
  primaryEmailForm!: FormGroup;
  alertManagerManager!: AlertManager;

  @Input() user!: UserSecurity;
  @Output() isSummited = new EventEmitter<boolean>();

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.alertManagerManager = new AlertManager();
    this.addEmailForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  get f() { return this.addEmailForm.controls; }

  addEmail(): void {

  }

  primaryEmail(): void {

  }

}
