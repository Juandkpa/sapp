import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { map } from "rxjs/operators";


export class Group {
  id: number;
  name: string;
  fragment: string;
  image: string;
  constructor(values: Object = {}) {
       Object.assign(this, values);
  }
}

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class RestProvider {
   baseUrl:string = "https://groups-api-p.herokuapp.com";
  //baseUrl:string = "http://localhost:3000";
  options:any;

  constructor(private http : HttpClient) {
    let headers = new HttpHeaders(
      {
        'Content-Type': 'application/json'
      }
      );
    this.options = { headers: headers };


  }
  
  //methods
  /**
   * Sending a get request to /products
   */
  public getGroups() : Observable<Group[]>  {    
    
    return this.http
      .get(this.baseUrl + '/groups')
      .pipe(        
        map (ans => Object.keys(ans).map(k=> new Group(ans[k])))
      )
  }

  public createGroup(group: Group) : Observable<Group> {    
        
    let data = JSON.stringify(group);
    return this.http
      .post(this.baseUrl + '/groups', data, this.options)
      .pipe(
        map(ans => new Group(ans))
      )
  }

  public getGroupById(groupId: number) {    

  }

  public updateGroup(group: Group):Observable<Group> {
    let data = JSON.stringify(group)
    return this.http
    .put(this.baseUrl + '/groups/' + group.id, data, this.options)    
    .pipe(
      map(ans => new Group(ans))
    )
  }

  public deleteGroupById(groupId: number) {
    return this.http
      .delete(this.baseUrl + '/groups/' + groupId, this.options)
 
  }

}
