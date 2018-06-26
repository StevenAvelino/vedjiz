import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { DataProvider } from '../providers/data/data'

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SettingsPage } from '../pages/settings/settings';
import { ShowProductPage } from '../pages/products/show/products';
import { CreateProductPage } from '../pages/products/create/products';
import { SynchroPage } from '../pages/synchro/synchro';
import { OrderPage } from '../pages/orders/orders';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SettingsPage,
    ShowProductPage,
    CreateProductPage,
    SynchroPage,
    OrderPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SettingsPage,
    ShowProductPage,
    CreateProductPage,
    SynchroPage,
    OrderPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider
  ]
})
export class AppModule {}
