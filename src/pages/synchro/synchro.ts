import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { DataProvider } from '../../providers/data/data'
import 'rxjs/add/operator/map'
import { ShowProductPage } from '../products/show/products';

import { Product } from '../../models/Product';

@Component({
  selector: 'synchro-page',
  templateUrl: 'synchro.html'
})
export class SynchroPage {

  constructor(public navParams: NavParams, public dataProvider: DataProvider, public navCtrl: NavController) {
    
  }

  uploadData() {
    let updatedProducts = []
    for (let product of this.dataProvider.products) {
      if (product.updated) {
        product.updated = false
        updatedProducts.push(product)
      }
    }

    this.dataProvider.setProducts()
    this.dataProvider.updateProducts(updatedProducts)
  }

  details(product) {
    this.navCtrl.push(ShowProductPage, {
      'product': product
    })
  }
}
