import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {UserService} from "../../../_services/_api/user.service";
import {UserSecurity} from "../../../_models/user.security";
import {HttpClient, HttpParams} from "@angular/common/http";
import {fromEvent, merge, Observable} from "rxjs";
import {debounceTime, distinctUntilChanged, map, tap} from "rxjs/operators";
import {UserSecurityDataSource} from "../../../_models/_datasource/UserSecurityDataSource";
import {ActivatedRoute} from "@angular/router";

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
  @ViewChild('input') input!: ElementRef;
  selected: string | undefined;

  displayedColumns: string[] = ['id', 'username', 'email'];
  dataSource!: UserSecurityDataSource;

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userSecurity = this.route.snapshot.data["userSecurity"];
    this.dataSource = new UserSecurityDataSource(this.userService);
    this.dataSource.loadLessons(0);
    this.userService.count().subscribe(value => {
      this.length = value;
    });
  }

  ngAfterViewInit() {
    // server-side search
    fromEvent(this.input.nativeElement,'keyup').pipe(debounceTime(150),distinctUntilChanged(),tap(() => {this.paginator.pageIndex = 0; this.load();})).subscribe();
    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    // on sort or paginate events, load a new page
    merge(this.sort.sortChange, this.paginator.page).pipe(tap(() => this.load())).subscribe();
    console.log(this.dataSource)
  }

  load() {
    this.dataSource.loadLessons(this.paginator.pageIndex, this.paginator.pageSize, this.sort.active, this.sort.direction, this.selected, this.input.nativeElement.value);
  }

}
