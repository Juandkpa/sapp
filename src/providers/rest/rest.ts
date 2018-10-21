import { HttpClient } from '@angular/common/http';
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
  baseUrl:string = "http://localhost:3000";

  constructor(private http : HttpClient) {}
  
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

  public createGroup(group: Group) {
    return this.http
      .post(this.baseUrl + '/groups', group)
      .pipe(
        map(ans => new Group(ans))
      )
  }

  public getGroupById(groupId: number) {    

  }

  public updateProduct(product: Group) {

  }

  public deleteProductById(groupId: number) {
 
  }

}
