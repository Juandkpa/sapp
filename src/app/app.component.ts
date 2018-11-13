import { Component, ViewChild } from '@angular/core';
import { Platform,  MenuController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = LoginPage;
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,    
    public menu: MenuController
  ) {
    this.initializateApp();
    this.buildPages();
  }

  //Class Methods

  initializateApp() {
    
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();  
      if(this.platform.is('core') || this.platform.is('mobileweb')) {
        console.warn("Not use one signal, mobile web");
      }else {
        var notificationOpenedCallback = function(jsonData) {
          console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
        };
        window["plugins"].OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});      
        window["plugins"].OneSignal
          .startInit("7046d862-ba79-4f12-9af9-506bb0bfa1f1", "854841993512")
          .handleNotificationOpened(notificationOpenedCallback)
          .endInit();        
      }

               
    });
  }

  buildPages() {
    this.pages = [
      {title: 'Groups', component: HomePage},
    ]
  }

  openPage(page) {
    this.menu.close();
    this.nav.setRoot(page.component);
  }

  public isThereASession():boolean{
    return localStorage.getItem("jwt")!= undefined;
  }

  logOut() {    
    this.menu.close();
    localStorage.removeItem("jwt");
    this.nav.setRoot(LoginPage);
  } 

}
