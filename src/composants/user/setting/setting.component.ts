import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {UserService} from "../../../_services/_api/user.service";
import {UserSecurity} from "../../../_models/user.security";
import {merge} from "rxjs";
import {tap} from "rxjs/operators";
import {UserSecurityDataSource} from "../../../_models/_datasource/UserSecurityDataSource";
import {ActivatedRoute} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit, AfterViewInit {

  //TUTO https://blog.angular-university.io/angular-material-data-table/

  userSecurity!: UserSecurity;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  length!: number;
  @ViewChild(MatSort) sort!: MatSort;
  searchForm!: FormGroup;

  searchColumns: string[] = ['username', 'email'];
  displayedColumns: string[] = ['id', 'username', 'email'];
  dataSource!: UserSecurityDataSource;

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userSecurity = this.route.snapshot.data["userSecurity"];
    this.dataSource = new UserSecurityDataSource(this.userService);
    this.dataSource.loadLessons(0);
    this.searchForm = new FormGroup({
      select: new FormControl(this.searchColumns[0], Validators.required),
      value: new FormControl('', Validators.required),
    });
    this.userService.count().subscribe(value => {
      this.length = value;
    });
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
}
