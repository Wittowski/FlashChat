import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import {
  NavController,
  NavParams,
  LoadingController,
  AlertController,
} from 'ionic-angular';
//Provider
import { FeedbackModel } from '../../models/FeedbackModel';
import { SearchService } from '../../providers/searchService';
//Page
import { HomePage } from '../home/home'

@Component({
  selector: 'page-main',
  templateUrl: 'main.html'
})

export class MainPage {
  id: string;
  username: string;
  mainmenu: string = "profile";
  email: string;
  errorMessage: string;
  data: FeedbackModel;
  contacts: any;



  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public SearchService: SearchService,
    public storage: Storage
  ) {
    //call provider (SearchService)
    this.SearchService.search(String(this.username)).subscribe(
      res => {
        this.data = res; //get json data from provider (Backend)
        if (this.data.status === 'ok') {

          this.storage.ready().then(() => {

            let UserData = JSON.parse(this.data.data);
            //set Contact_Data to storage
            this.storage.set('Contact_Data', UserData);
            
            //get Contact_Data from storage
            this.storage.get('Contact_Data').then((val) => {
              this.contacts = val;
            });
            //get id from storage
            this.storage.get('id').then((val) => {
              this.id = val;
            });
            //get username from storage
            this.storage.get('username').then((val) => {
              this.username = val;
            });
            //get email from storage
            this.storage.get('email').then((val) => {
              this.email = val;
            });
          });

        } else { //if status = 'error'
          let alert = this.alertCtrl.create({
            title: this.data.data,
            buttons: ['OK']
          });
          // console.log('login failed');
          alert.present();
        }
      }
    );
    //load data from local storage
    this.storage.ready().then(() => {
      //get id from storage
      this.storage.get('id').then((val) => {
        this.id = val;
      })
      //get username from storage
      this.storage.get('username').then((val) => {
        this.username = val;
      })
      //get email from storage
      this.storage.get('email').then((val) => {
        this.email = val;
      })
    });

  }


  logout(): void {
    // let loader = this.loadingCtrl.create({
    //   content: "Loging Out..."
    // });
    // loader.present();
    let confirm = this.alertCtrl.create({
      title: 'Logout',
      message: 'Are you sure ?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => { }
        },
        {
          text: 'Logout',
          handler: () => {
            this.storage.ready().then(() => {
              this.storage.remove("id");
              this.storage.remove("username");
              this.storage.remove("email");
              this.storage.remove("Contact_Data");
              this.navCtrl.setRoot(HomePage);
            });
          }
        }
      ]
    });
    confirm.present();
  }
}
