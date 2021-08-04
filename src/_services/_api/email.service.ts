import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({ providedIn: 'root' })
export class EmailService {

  url: string = 'email/';

  constructor(private http: HttpClient) { }

  create(b: {email: string}) {
    return this.http.post(`${environment.apiUrl}${this.url}create`, b);
  }

  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}${this.url}${id}`);
  }

  updateBackup(id: number, b: {backup: boolean}): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}${this.url}backup/${id}`, b);
  }

  updatePriority(b: {email: string}): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}${this.url}priority`, b);
  }

  updatePreferences(b: {emailPreferences: string}): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}${this.url}preferences`, b);
  }

  confirm(token: string): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}${this.url}action/confirm`, token);
  }

  confirmResend(id: number): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}${this.url}action/confirm/resend/${id}`, {});
  }

}
