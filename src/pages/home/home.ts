import { Component } from '@angular/core';
import { RestProvider, Group } from '../../providers/rest/rest';
//import { App, MenuController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private groups : Group[];  
  
  constructor(public restProvider:RestProvider) {
    this.groups = [];
    this.getProducts();     
  }
  
  getProducts() {
    this.restProvider
      .getGroups()
      .subscribe(
        (groups : Group[]) => {
          this.groups = groups;
          console.warn("groups >> ", this.groups);
        },
        (err) => {
          console.error(err);
        }
      )
  }
}