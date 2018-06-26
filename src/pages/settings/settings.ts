import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  settingsForm: FormGroup
  name: string

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder, private storage: Storage, private toastCtrl: ToastController) {
    this.initForm()
  }

  cancel() {
    this.initForm()
    this.navCtrl.popToRoot()
  }

  save() {
    this.name = this.settingsForm.controls.name.value
    this.storage.set('name', this.name).then(res => {
      this.presentSuccessToast()
    })
    this.initForm()
    this.navCtrl.popToRoot()
  }

  ionViewCanLeave() {
    if (this.settingsForm.dirty) {
      this.presentToast()
    }
    return !this.settingsForm.dirty
  }

  initForm() {
    this.settingsForm = this.formBuilder.group({
      name: [this.name]
    })
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Vous devez enregistrer ou annuler les modifications en cours.',
      duration: 3000,
    });

    toast.present()
  }

  presentSuccessToast() {
    let toast = this.toastCtrl.create({
      message: 'Nom changer avec succes',
      duration: 3000,
    });

    toast.present()
  }
}