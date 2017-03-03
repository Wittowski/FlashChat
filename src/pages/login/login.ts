import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from '@angular/forms';
import {
  NavController,
  NavParams,
  ModalController,
  LoadingController,
  AlertController
} from 'ionic-angular';

import { AuthService } from '../../providers/authService';
import { AuthModel } from '../../models/AuthModel';

import { ModalPage } from './modal-page';
import { RegisterPage } from '../register/register';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  loginForm: FormGroup;
  email: FormControl;
  password: FormControl;
  errorMessage: string;
  data: AuthModel;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public fb: FormBuilder,
    public AuthService: AuthService
  ) {
    //validate form such as required, minLength
    this.email = fb.control('', Validators.compose([
      Validators.required,
      LoginPage.emailValidator //call method emailValidator for validate email
    ]));
    this.password = fb.control('', Validators.compose([Validators.required, Validators.minLength(6)]));

    this.loginForm = fb.group({
      'email': this.email,
      'password': this.password
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  //validate email by use Regular Expression
  static emailValidator(control: FormControl) {
    let email_regxp: any = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return email_regxp.test(control.value) ? null : { invalidEmail: true };
  }

  private login(): void {
    //console.log(this.loginForm.value);
    //get form input data
    let email = this.loginForm.controls['email'].value;
    let password = this.loginForm.controls['password'].value;
    //show loading controller
    let loader = this.loadingCtrl.create({
      content: "Loging in..."
    });
    loader.present();
    //call provider (AuthService)
    this.AuthService.login(email, password).subscribe(
      res => {
        this.data = res; //get json data from provider (Backend)
        if (this.data.status === 'ok') {
          let alert = this.alertCtrl.create({
            title: this.data.data,
            buttons: ['OK']
          });
          //console.log('signup ok');
          alert.present();
          this.loginForm.reset(); //reset form
        } else { //if status = 'error'
          let alert = this.alertCtrl.create({
            title: this.data.data,
            buttons: ['OK']
          });
          // console.log('signup not ok');
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

  CreateAccount() {
    this.navCtrl.push(RegisterPage);
  }
}







