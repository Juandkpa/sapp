import { Component, ViewChild } from '@angular/core';
import { Platform,  MenuController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = HomePage;
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
}

