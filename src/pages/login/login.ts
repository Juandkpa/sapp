import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup,FormControl } from '@angular/forms';
import { HomePage } from '../home/home';
import { SingUpPage } from '../sing-up/sing-up';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  credentials: FormGroup;
  badLogin:number;  

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private frmBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    private authProvider: AuthServiceProvider
    ) {
      this.badLogin = 0;
      this.credentials = this.frmBuilder.group({
        email: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])),
          password: ['',Validators.required],
      });
  }

  login() {
    let loader = this.loadingCtrl.create({
      spinner: 'bubbles'
    });
    loader.present();
    let userData = {
      auth:{
        email    : this.credentials.value.email,
        password : this.credentials.value.password
      }
    };    
    this.authProvider.login(userData)
    .subscribe(
      (data)=> {        
        localStorage.setItem('jwt', data['jwt']);
        loader.dismiss();
        this.navCtrl.setRoot(HomePage);
      },
      (err) =>{
        console.log("error usuario no encontrado");
        loader.dismiss();
        this.badLogin = 1;
      }
    );    
  }  

  goSignUp() {
    this.navCtrl.push(SingUpPage);
  }

  ionViewWillEnter() {
    let jwt=localStorage.getItem("jwt");
    if( jwt ) {
        this.navCtrl.setRoot(HomePage);
    }
  }

}
