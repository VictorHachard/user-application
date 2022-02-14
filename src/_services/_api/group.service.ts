import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Group} from "../../_models/group";

@Injectable({ providedIn: 'root' })
export class GroupService {
  constructor(private http: HttpClient) { }

  url: string = 'group/';

  count(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}${this.url}count`);
  }

  getAllDto(): Observable<Group[]> {
    return this.http.get<Group[]>(`${environment.apiUrl}${this.url}dto`);
  }

  getAllActiveDto(): Observable<Group[]> {
    return this.http.get<Group[]>(`${environment.apiUrl}${this.url}dto/active`);
  }

  addGroup(b: {name: string, color: string}) {
    return this.http.post(`${environment.apiUrl}${this.url}create`, b);
  }

  updateGroupActive(id: number, b: {active: boolean}) {
    return this.http.post<any>(`${environment.apiUrl}${this.url}update/active/${id}`, b);
  }

}
