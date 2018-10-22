import { Component,  } from '@angular/core';
import { RestProvider, Group  } from '../../providers/rest/rest';
import { ModalController } from 'ionic-angular';
import { CreateGroupPage } from '../create-group/create-group';
//import { UpdatePage } from '../create-group/create-group';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private groups : Group[];  
  private modalComponent : any;
  selectedGroup : Group;
  
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

  openModal(group) {
    console.warn("in open modal group >>", group);
    
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