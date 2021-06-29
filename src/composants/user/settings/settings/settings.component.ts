import {Component, OnInit} from '@angular/core';
import {UserSecurity} from "../../../../_models/user.security";
import {AuthenticationService} from "../../../../_services/authentication.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  user!: UserSecurity;
  param!: string | null;

  constructor(private authenticationService: AuthenticationService,
              private route: ActivatedRoute) {
    this.authenticationService.currentUser.subscribe(x => {this.user = x;});
    this.route.paramMap.subscribe(params => {this.ngOnInit();});
  }

  ngOnInit(): void {
    this.param = this.route.snapshot.paramMap.get('param');
    this.refresh(true);
  }

  refresh($event: boolean): void {
    if ($event) {this.authenticationService.updateUser().subscribe(value => {});}
  }
}
