import {Component} from '@angular/core';
import {UserSecurity} from "../../../_models/user.security";
import {AuthenticationService} from "../../../_services/authentication.service";
import {UserService} from "../../../_services/_api/user.service";
import {ImageService} from "../../../_services/_api/image.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  user!: UserSecurity;
  currentUser!: UserSecurity;
  username!: string;

  constructor(private authenticationService: AuthenticationService,
              private userService: UserService,
              private imageService: ImageService,
              private route: ActivatedRoute) {
    this.authenticationService.currentUser.subscribe(x => {this.currentUser = x; this.ngOnInit();});
    this.route.paramMap.subscribe(params => {this.ngOnInit();});
  }

  ngOnInit(): void {
    this.username = this.route.snapshot.paramMap.get('username')!;
    if (this.username != this.currentUser.username) {
      this.userService.getProfile(this.username).subscribe(value => {
        this.user = value;
      });
    } else {
      this.user = this.currentUser;
    }
  }

}
