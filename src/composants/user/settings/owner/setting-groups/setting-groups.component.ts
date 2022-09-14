import {Component, OnInit} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {AlertManager} from "../../../../../_helpers/alert.manager";
import {GroupService} from "../../../../../_services/_api/group.service";
import {Group} from "../../../../../_models/group";

@Component({
  selector: 'app-setting-groups',
  templateUrl: './setting-groups.component.html',
  styleUrls: ['./setting-groups.component.scss']
})
export class SettingGroupsComponent implements OnInit {

  addGroupForm!: UntypedFormGroup;
  activeGroupForm!: UntypedFormGroup;
  alertManagerManager: AlertManager = new AlertManager();
  groupList!: Group[];

  constructor(private groupService: GroupService) { }

  ngOnInit(): void {
    this.groupService.getAllDto().subscribe(value => {
      this.groupList = value;
      console.log(value);
      this.addGroupForm = new UntypedFormGroup({
        name: new UntypedFormControl('', Validators.required),
        color: new UntypedFormControl('#0d6efd', Validators.required)
      });
      this.activeGroupForm = new UntypedFormGroup({});
      for (let e of this.groupList!) {
        this.activeGroupForm.addControl('group' + e.id!.toString(), new UntypedFormControl(e.active))
      }
    });
  }

  get f() { return this.addGroupForm.controls; }

  addGroup(): void {
    this.groupService.addGroup({name: this.f.name.value, color: this.f.color.value}).subscribe(value => {
      this.alertManagerManager.addAlertIcon('addGroup');
      this.ngOnInit();
    })
  }

  activeGroup(id: number) {
    this.groupService.updateGroupActive(id, {active: this.activeGroupForm.get('group' + id)!.value}).subscribe(value => {
      this.alertManagerManager.addAlertIcon('group');
      this.ngOnInit();
    });
  }
}
