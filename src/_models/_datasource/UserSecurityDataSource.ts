import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {UserSecurity} from "../user.security";
import {BehaviorSubject, Observable} from "rxjs";
import {UserService} from "../../_services/_api/user.service";
import {finalize} from "rxjs/operators";

export class UserSecurityDataSource implements DataSource<UserSecurity> {

  private lessonsSubject = new BehaviorSubject<UserSecurity[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private userService: UserService) {}

  connect(collectionViewer: CollectionViewer): Observable<UserSecurity[]> {
    return this.lessonsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.lessonsSubject.complete();
    this.loadingSubject.complete();
  }

  loadLessons(pageIndex = 0, pageSize = 10, sortBy= 'id', orderBy = 'asc', searchBy = 'null', searchValue = 'null') {
    this.loadingSubject.next(true);
    this.userService.getAll(pageIndex, pageSize, sortBy, orderBy, searchBy, searchValue).pipe(
      finalize(() => this.loadingSubject.next(false))
    ).subscribe(lessons => this.lessonsSubject.next(lessons));
  }
}
