import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataProvider } from '../../../providers/data/data'

import { Product } from '../../../models/Product'
import { Supplier } from '../../../models/Supplier';

@Component({
  selector: 'page-show-products',
  templateUrl: 'products.html'
})
export class ShowProductPage {

  product: Product
  productForm: FormGroup
  quantityOrder: number
  supplierOrder: number

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private toastCtrl: ToastController, public dataProvider: DataProvider) {
    this.product = this.navParams.get('product')
    this.initForm()
  }

  cancel() {
    this.initForm()
    this.navCtrl.popToRoot()
  }

  save() {
    this.product.price = this.productForm.controls.price.value
    this.product.unit = this.productForm.controls.unit.value
    this.product.stock = this.productForm.controls.stock.value
    this.product.updated = true
    this.dataProvider.setProducts()
    if (this.product.stock <= this.product.low_stock_threshold) {
      this.dataProvider.submitOrder(this.product.id, this.supplierOrder, this.productForm.controls.quantityOrder.value).then(res => {
        this.orderToast()
        this.initForm()
        this.navCtrl.popToRoot()
      }).catch(error => {
        this.problemToast()
      })
    } else {
      this.initForm()
      this.navCtrl.popToRoot()
    }
  }

  ionViewCanLeave() {
    if (this.productForm.dirty) {
      this.presentToast()
    }
    return !this.productForm.dirty
  }

  initForm() {
    this.productForm = this.formBuilder.group({
      price: [this.product.price],
      unit: [this.product.unit],
      stock: [this.product.stock],
      quantityOrder: [this.quantityOrder]
    });
  }

  chooseSupplierOrder(supplier) {
    this.supplierOrder = supplier.id
    console.log(this.supplierOrder)
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Vous devez enregistrer ou annuler les modifications en cours.',
      duration: 3000,
    });

    toast.present()
  }

  orderToast() {
    let toast = this.toastCtrl.create({
      message: 'Commande envoyée',
      duration: 3000,
    });

    toast.present()
  }

  problemToast() {
    let toast = this.toastCtrl.create({
      message: 'Problème durant envoi de la commande',
      duration: 3000,
    });

    toast.present()
  }
}