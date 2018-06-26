import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Product } from '../../models/product';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'page-product',
  templateUrl: 'product.html'
})
export class ProductPage {

  product: Product
  productForm: FormGroup

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private toastCtrl: ToastController) {
    this.product = navParams.get('product')
    this.initForm()
  }

  cancel() {
    this.initForm()
  }

  save() {
    this.product.price = this.productForm.controls.price.value
    this.product.unit = this.productForm.controls.unit.value
    this.product.stock = this.productForm.controls.stock.value
    this.initForm()
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
      stock: [this.product.stock]
    });
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Vous devez enregistrer ou annuler les modifications en cours.',
      duration: 3000,
    });

    toast.present()
  }
}
