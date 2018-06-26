import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MenuController } from 'ionic-angular';

import { HomePage } from '../pages/home/home';
import { SettingsPage } from '../pages/settings/settings';
import { SynchroPage } from '../pages/synchro/synchro';
import { OrderPage } from '../pages/orders/orders';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  pages: Array<{title: string, component: any}>
  @ViewChild(Nav) nav: Nav

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.pages = [
      {
        title: 'Home', component: HomePage
      },
      {
        title: 'Settings', component: SettingsPage
      },
      {
        title: 'Synchro', component: SynchroPage
      },
      {
        title: 'Orders', component: OrderPage
      }
    ]
  }

  goToPage(component) {
    this.nav.setRoot(component);
  }
}

