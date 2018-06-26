import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { Storage } from '@ionic/storage';
import { DataProvider } from '../../providers/data/data'
import { Order } from '../../models/Order';

@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html'
})
export class OrderPage {

  orders: Order[]

  constructor(public navCtrl: NavController, private storage: Storage, public dataProvider: DataProvider, private toastCtrl: ToastController) {
    dataProvider.getOrders().then(res => {
      this.orders = res
    })
  }

  withdrawOrder(order) {
    this.dataProvider.withdrawOrder(order).then(res => {
      this.withdrawToast()
    })
  }

  withdrawToast() {
    let toast = this.toastCtrl.create({
      message: 'La commande a été annulée',
      duration: 3000,
    });

    toast.present()
  }
}