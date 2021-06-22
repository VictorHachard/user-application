import { Component, OnInit } from '@angular/core';
import {UserSecurity} from "../../../_models/user.security";
import {AuthenticationService} from "../../../_services/authentication.service";
import {UserService} from "../../../_services/_api/user.service";
import {ImageService} from "../../../_services/_api/image.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user!: UserSecurity;

  constructor(private authenticationService: AuthenticationService, private userService: UserService, private imageService: ImageService) {
    this.authenticationService.currentUser.subscribe(x => {this.user = x; this.ngOnInit();});
  }

  ngOnInit(): void {
  }

}
