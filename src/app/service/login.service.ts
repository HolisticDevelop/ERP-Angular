import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginUrl: string

  constructor(private http: HttpClient) {
    this.loginUrl = "/api/login";
  }

  public signIn(username: string, password: string): Observable<any>{

    let headers = new HttpHeaders({
      'content-type': "application/json",
      'username': username,
      'password': password
    });
    return this.http.get<any>(this.loginUrl, {headers: headers, observe: "response"});

  }

  public register(username: string, password: string): Observable<any>{

    return this.http.post<any>("/user/add", {username: username, password: password});

  }
}
