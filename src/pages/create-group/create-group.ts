import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { RestProvider, Group } from '../../providers/rest/rest';

@Component({
  selector: 'page-create-group',
  templateUrl: 'create-group.html',
})
export class CreateGroupPage {
  private group : Group;
  data = {};
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public restProvider: RestProvider
    ) {      
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateGroupPage');
  }

  save() {
    //lacks loader
    this.group = new Group(this.data);
    console.warn("group >>> ", this.group);
    this.restProvider
      .createGroup(this.group)
      .subscribe(
        (group: Group) => {
          console.warn("group saved", group);
          this.dismiss();
        },
        (err) => {
          console.error(err);
        }
        
      )

  }
  dismiss() {
    this.viewCtrl.dismiss();
  }

}
