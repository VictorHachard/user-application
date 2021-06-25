import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AlertManager} from "../../../../../_helpers/alert.manager";
import {GroupService} from "../../../../../_services/_api/group.service";
import {Group} from "../../../../../_models/group";

@Component({
  selector: 'app-setting-groups',
  templateUrl: './setting-groups.component.html',
  styleUrls: ['./setting-groups.component.scss']
})
export class SettingGroupsComponent implements OnInit {

  addGroupForm!: FormGroup;
  alertManagerManager: AlertManager = new AlertManager();
  groupList!: Group[];

  constructor(private groupService: GroupService) { }

  ngOnInit(): void {
    this.groupService.getAllDto().subscribe(value => {
      this.groupList = value;
      console.log(value);
      this.addGroupForm = new FormGroup({
        name: new FormControl('', Validators.required)
      });
      /*this.activeThemeForm = new FormGroup({});
      for (let e of this.roleList!) {
        this.activeThemeForm.addControl('theme' + e.id!.toString(), new FormControl(e.active))
      }*/
    });
  }

  get f() { return this.addGroupForm.controls; }

  addGroup(): void {
    this.groupService.addGroup({name: this.f.name.value}).subscribe(value => {
      this.alertManagerManager.addAlertIcon('group');
      this.ngOnInit();
    })
  }
}
