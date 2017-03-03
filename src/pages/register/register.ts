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
  ViewController,
  LoadingController,
  AlertController
} from 'ionic-angular';

import { RegisterService } from '../../providers/registerService';
import { AuthModel } from '../../models/AuthModel';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  registerForm: FormGroup;
  username: FormControl;
  email: FormControl;
  password: FormControl;
  repassword: FormControl;
  errorMessage: string;
  data: AuthModel;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public fb: FormBuilder,
    public RegisterService: RegisterService
  ) {
    // //validate form such as required, minLength
    this.username = fb.control('', Validators.compose([Validators.required, Validators.minLength(4)]));
    this.email = fb.control('', Validators.compose([Validators.required]));
    this.password = fb.control('', Validators.compose([Validators.required, Validators.minLength(6)]));
    this.repassword = fb.control('', Validators.compose([Validators.required, Validators.minLength(6)]));

    this.registerForm = fb.group({
      'username': this.username,
      'email': this.email,
      'password': this.password,
      'repassword': this.repassword
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  //validate email by use Regular Expression
  static emailValidator(control: FormControl) {
    let email_regxp: any = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return email_regxp.test(control.value) ? null : { invalidEmail: true };
  }

  private register(): void {
    //console.log(this.'.registerForm.value);
    //get form input data
    let username = this.registerForm.controls['username'].value;
    let email = this.registerForm.controls['email'].value;
    let password = this.registerForm.controls['password'].value;
    let repassword = this.registerForm.controls['repassword'].value;
    //show loading controller
    let loader = this.loadingCtrl.create({
      content: "Working..."
    });
    loader.present();
    //call provider (AuthService)
    this.RegisterService.register(username, email, password).subscribe(
      res => {
        this.data = res; //get json data from provider (Backend)
        if (this.data.status === 'ok') {
          let alert = this.alertCtrl.create({
            title: this.data.data,
            buttons: ['OK']
          });
          //console.log('signup ok');
          alert.present();
          this.registerForm.reset(); //reset form
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

  ExitPage() {
    this.viewCtrl.dismiss();
  }
}
