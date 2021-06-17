import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {UserSecurity} from "../../_models/user.security";
import {environment} from "../../environments/environment";

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<UserSecurity[]>(`${environment.apiUrl}/user`);
  }

}
