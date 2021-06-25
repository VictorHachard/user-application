import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {UserSecurity} from "../../../../../_models/user.security";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserSecurityDataSource} from "../../../../../_models/_datasource/UserSecurityDataSource";
import {UserService} from "../../../../../_services/_api/user.service";
import {ActivatedRoute} from "@angular/router";
import {merge} from "rxjs";
import {tap} from "rxjs/operators";
import {AlertManager} from "../../../../../_helpers/alert.manager";
import {GroupService} from "../../../../../_services/_api/group.service";
import {Group} from "../../../../../_models/group";

@Component({
  selector: 'app-setting-users',
  templateUrl: './setting-users.component.html',
  styleUrls: ['./setting-users.component.scss']
})
export class SettingUsersComponent implements AfterViewInit {

  //TUTO https://blog.angular-university.io/angular-material-data-table/

  user!: UserSecurity;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  length!: number;
  @ViewChild(MatSort) sort!: MatSort;
  searchForm!: FormGroup;
  alertManagerManager: AlertManager = new AlertManager();

  searchColumns: string[] = ['username', 'email'];
  displayedColumns: string[] = ['id', 'username', 'email', 'action'];
  dataSource!: UserSecurityDataSource;

  roleForm!: FormGroup;
  groupForm!: FormGroup;
  groupList!: Group[];

  constructor(private userService: UserService,
              private groupService: GroupService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.dataSource = new UserSecurityDataSource(this.userService);
    this.dataSource.loadLessons(0);
    this.searchForm = new FormGroup({
      select: new FormControl(this.searchColumns[0], Validators.required),
      value: new FormControl('', Validators.required),
    });
    this.userService.count().subscribe(value => {
      this.length = value;
    });

    if (this.user) {
      this.roleForm = new FormGroup({
        ROLE_OWNER: new FormControl(this.user.roleDtoList?.filter(r => r.name === 'ROLE_OWNER').length === 1),
        ROLE_ADMINISTRATOR: new FormControl(this.user.roleDtoList?.filter(r => r.name === 'ROLE_ADMINISTRATOR').length === 1)
      });
      this.groupService.getAllActiveDto().subscribe(value => {
        this.groupList = value;
        this.groupForm = new FormGroup({});
        for (let e of this.groupList!) {
          this.groupForm.addControl('group' + e.id!.toString(), new FormControl(false));
        }
      });
    }
  }

  ngAfterViewInit() {
    this.paginator.pageIndex = 0;
    this.load();
    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    // on sort or paginate events, load a new page
    merge(this.sort.sortChange, this.paginator.page).pipe(tap(() => this.load())).subscribe();
  }

  get f() { return this.searchForm.controls; }

  load() {
    this.dataSource.loadLessons(this.paginator.pageIndex, this.paginator.pageSize, this.sort.active, this.sort.direction, this.f.value.value != '' ? this.f.select.value : 'null', this.f.value.value !== '' ? this.f.value.value : 'null');
  }

  edit(id: number): void {
    this.userService.get(id).subscribe(value => {
      this.user = value;
      this.ngOnInit();
    })
  }

  roleChange(role: string): void {

  }

  groupChange(id: number): void {

  }
}
