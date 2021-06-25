import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Group} from "../../_models/group";

@Injectable({ providedIn: 'root' })
export class GroupService {
  constructor(private http: HttpClient) { }

  count(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}group/count`);
  }

  getAllDto(): Observable<Group[]> {
    return this.http.get<Group[]>(`${environment.apiUrl}group/dto`);
  }

  addGroup(b: {name: string}) {
    return this.http.post(`${environment.apiUrl}group/create`, b);
  }

}
