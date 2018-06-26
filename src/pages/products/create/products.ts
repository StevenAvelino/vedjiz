import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Product } from '../../../models/Product'

@Component({
  selector: 'page-create-product',
  templateUrl: 'products.html'
})
export class CreateProductPage {

  name: string
  price: number
  unit: string
  path: string

  constructor(public navCtrl: NavController, private storage: Storage) {
    
  }

  createProduct() {

  }
}