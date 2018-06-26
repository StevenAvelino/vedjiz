import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { Product } from '../../models/Product';
import { ShowProductPage } from '../products/show/products';
import { CreateProductPage } from '../products/create/products';
import { Storage } from '@ionic/storage';
import { DataProvider } from '../../providers/data/data'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  products: Product[]

  constructor(public navCtrl: NavController, private storage: Storage, public http: HttpClient, public dataProvider: DataProvider, private toastCtrl: ToastController) {
    dataProvider.getProducts().then(res => {
      this.products = res
    })
  }

  ionViewDidLoad() {
    
  }

  details(product) {
    this.navCtrl.push(ShowProductPage, {
      'product': product
    })
  }

  setLastUpdate() {
    this.storage.set('lastupdate', {"updated_at":"2017-06-26 07:17:17"}).then(res => {
      this.storage.get('lastupdate').then(val => {
        console.log(val)
      })
    })
  }

  getProducts() {
    console.log(this.dataProvider.products)
  }

  refresh(refresher) {
    this.dataProvider.refreshProducts().then(res => {
      if (res) {
        this.dataProvider.doRefreshProducts().then(res => {
          refresher.complete()
          this.refreshedToast()
        })
      } else {
        refresher.complete()
        this.unchangedToast()
      }
    })
  }

  refreshedToast() {
    let toast = this.toastCtrl.create({
      message: 'Les données ont été rafraichis',
      duration: 3000,
    });

    toast.present()
  }

  unchangedToast() {
    let toast = this.toastCtrl.create({
      message: 'Pas besoin d\'update',
      duration: 3000,
    });

    toast.present()
  }

}
