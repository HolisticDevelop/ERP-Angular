import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginUrl: string

  private formData = new FormData()

  constructor(private http: HttpClient) {
    this.loginUrl = "/api/login";
  }

  public signIn(username: string, password: string){
    this.formData.set("username", username);
    this.formData.set("password", password);

    let headers = new HttpHeaders();
    // headers.set("Accept", "*/*");
    // headers.set("Accept-Encoding", "gzip");
    headers.append("username", username);
    headers.append("password", password);

    return this.http.post<any>(this.loginUrl, null, {headers: headers});
  }
}
