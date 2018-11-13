import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { LoginPage } from '../login/login';
/**
 * Generated class for the SingUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sing-up',
  templateUrl: 'sing-up.html',
})
export class SingUpPage {
  userData:any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public authProvider: AuthServiceProvider
  ) {
    this.userData = {
      "name":"",
      "email":"",
      "username":"",
      "password":"",
      "password_confirmation":"", 
    };

  }

  signUp() {
    this.authProvider.singUp(this.userData)
    .subscribe(
      (data) => {
        this.showNotification(data);
      }
    )
    
  }


  showNotification(data): any {
    console.log(data)
    this.alertCtrl.create({
      title: "Bienvenido " + data["name"],
      subTitle: "Disfruta la app",
      buttons: [
        {
          text:'ok',
          handler:()=> {
            this.navCtrl.setRoot(LoginPage);
          }
        }

      ]
    }).present(); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SingUpPage');
  }
}
