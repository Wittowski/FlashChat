import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Firebase } from 'ionic-native';
import { ModalPage } from './modal-page';
import { RegisterPage } from '../register/register';
/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  CreateAccount() {
    let modal = this.modalCtrl.create(RegisterPage);
    modal.present();
  }

  Login(username,password) {
    
  }
}
