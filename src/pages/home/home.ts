import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

//Page
import { LoginPage } from '../login/login';
import { SnmInstructionPage } from '../snm-instruction/snm-instruction';
import { MainPage } from '../main/main';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  id: string;
  username: string;
  email: string;
  

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage
  ) {

    storage.ready().then(() => {
      //get username from storage
      storage.get('id').then((val) => {
        this.id = val;
      })
      //get username from storage
      storage.get('username').then((val) => {
        this.username = val;
      })
      //get email from storage
      storage.get('email').then((val) => {
        this.email = val;
        if (this.id != undefined && this.username != undefined && this.email != undefined) {
          this.navCtrl.setRoot(MainPage);
        }
      })
    });


  }

  GoLogin() {
    this.navCtrl.push(LoginPage);
  }

  GoSelfNetworkMode() {
    this.navCtrl.push(SnmInstructionPage);
  }

}
