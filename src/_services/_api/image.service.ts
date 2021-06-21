import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {SecurityLog} from "../../_models/security.log";

@Injectable({ providedIn: 'root' })
export class ImageService {
  constructor(private http: HttpClient) { }

  public upload(file: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/image/upload`, file);
  }

}
