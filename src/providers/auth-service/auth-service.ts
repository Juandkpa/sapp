import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {
  //baseUrl:string = "https://groups-api-p.herokuapp.com";
  baseUrl:string = "http://localhost:3000";
  headers: HttpHeaders;
  options: any;
  constructor(public http: HttpClient) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this.options = {headers: this.headers};
  }

  login(data) {
    let json = JSON.stringify(data);
    return this.http.post(this.baseUrl + '/user_token', json, this.options);
  }

  singUp(data) {
    let json = JSON.stringify(data);
    return this.http.post(this.baseUrl + '/users', json, this.options);
  }
 
}
