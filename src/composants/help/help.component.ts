import {Component, OnInit} from '@angular/core';
import {UserService} from "../../_services/_api/user.service";

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.count().subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
