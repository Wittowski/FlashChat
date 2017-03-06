import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import {
  NavController,
  NavParams,
  LoadingController,
  AlertController,
} from 'ionic-angular';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from '@angular/forms';
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
  searchForm: FormGroup;
  user: FormControl;
  errorMessage: string;
  data: FeedbackModel;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public fb: FormBuilder,
    public SearchService: SearchService,
    public storage: Storage
  ) {
    //Set profile segment to default activation
    // this.mainmenu = 'profile';

    //validate form such as required, minLength
    this.user = fb.control('', Validators.compose([Validators.required, Validators.minLength(3)]));
    this.searchForm = fb.group({
      'user': this.user
    });

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

  search() {
    let user = this.searchForm.controls['user'].value;
    let loader = this.loadingCtrl.create({
      content: "Searching..."
    });
    loader.present();
    //call provider (SearchService)
    this.SearchService.search(user).subscribe(
      res => {
        this.data = res; //get json data from provider (Backend)
        if (this.data.status === 'ok') {
          this.searchForm.reset();  //reset form
          //let UserData = JSON.parse(this.data.data);
          let confirm = this.alertCtrl.create({
            title: 'User ' + user.charAt(0).toUpperCase() + user.slice(1) + ' Found',
            message: 'Add user to contact ?',
            buttons: [
              {
                text: 'Cancel',
                handler: () => { }
              },
              {
                text: 'Add',
                handler: () => {
                  // console.log('Agree clicked');
                }
              }
            ]
          });
          confirm.present();

          //console.log('login ok');
        } else { //if status = 'error'
          let alert = this.alertCtrl.create({
            title: this.data.data,
            buttons: ['OK']
          });
          // console.log('login failed');
          alert.present();
        }
      },
      error => {
        this.errorMessage = <any>error
        console.log(this.errorMessage);
        loader.dismiss();
      },
      () => {
        loader.dismiss();
      }
    );
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
              this.navCtrl.setRoot(HomePage);
            });
          }
        }
      ]
    });
    confirm.present();
  }
}
