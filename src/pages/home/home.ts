import { Component,  } from '@angular/core';
import { RestProvider, Group  } from '../../providers/rest/rest';
import { ModalController } from 'ionic-angular';
import { CreateGroupPage } from '../create-group/create-group';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private groups : Group[];  
  
  constructor(public restProvider:RestProvider, public modalCtrl: ModalController) {
    this.groups = [];
    this.getGroups();     
  }
  
  getGroups() {
    //lack loaders
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

  openModal() {
    let modal = this.modalCtrl.create(CreateGroupPage);

    modal.onDidDismiss(data => {
      this.getGroups();
    })
    modal.present();

  }
}