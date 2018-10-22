import { Component,  } from '@angular/core';
import { RestProvider, Group  } from '../../providers/rest/rest';
import { ModalController, LoadingController  } from 'ionic-angular';
import { CreateGroupPage } from '../create-group/create-group';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private groups : Group[];    
  selectedGroup : Group;
  
  constructor(
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public restProvider:RestProvider
    
    ) {
    this.groups = [];    
    this.getGroups();     
  }
  
  getGroups() {
    const loader = this.loadingCtrl.create({
      spinner: 'bubbles'      
    })
    loader.present();
    this.restProvider
      .getGroups()
      .subscribe(
        (groups : Group[]) => {
          this.groups = groups;
          loader.dismiss();
          console.warn("groups >> ", this.groups);
        },
        (err) => {
          loader.dismiss();
          console.error(err);
        }
      )
  }

  openModal(group) {    
    this.selectedGroup = group;
    let modal = this.modalCtrl.create(CreateGroupPage, {selectedGroup: this.selectedGroup});
    modal.onDidDismiss(data => {
      this.getGroups();
    })
    modal.present();
  }

  delete(id) {
    this.restProvider
      .deleteGroupById(id)
      .subscribe(
        () => {
          this.getGroups();
          console.warn("eliminado ok");
        },
        (err) =>{
          console.error("error al elimnar", err);
        }        
      )
  }

}