import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { RestProvider, Group } from '../../providers/rest/rest';

@Component({
  selector: 'page-create-group',
  templateUrl: 'create-group.html',
})
export class CreateGroupPage {  
  private group : Group;
  private updateMode : boolean;
  data = {};
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public restProvider: RestProvider,
    params: NavParams
    ) {
      this.updateMode = false;
      let sGroup = params.get('selectedGroup');
      if( sGroup ) {
        this.updateMode = true;
        let asString = JSON.stringify(sGroup);
        this.data = JSON.parse(asString);        
      }
      
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateGroupPage');
  }

  save() {    
    this.group = new Group(this.data);
    this.restProvider
      .createGroup(this.group)
      .subscribe(
        (group: Group) => {          
          this.dismiss();
        },
        (err) => {
          console.error(err);
        }        
      )
  }

  update() {
    this.group = new Group(this.data);
    this.restProvider
      .updateGroup(this.group)
      .subscribe(
        (group: Group) =>{          
          this.dismiss();
        },
        (err) =>{
          console.error(err);
        }
      )
  }

  fireAction() {
    this.updateMode ? this.update() : this.save();
  }


  dismiss() {
    this.viewCtrl.dismiss();
  }

}
