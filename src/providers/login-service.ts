import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/Observable/throw';
import { LoginModel } from '../models/login';

/*
  Generated class for the LoginService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LoginService {

  constructor(public http: Http) { }

  getCourse(): Observable<LoginModel[]> {
    return this.http.post('http://nel009.dcs.corp/flashchat/login.php','')
      .map((res: Response) => <LoginModel[]>res.json())
      .catch(this.handleError);
  }
  //method handleError เป็น method สําหรับดักจับข้อผิดพลาดที.ส่งมาจาก Backend
  // error.json().errorMessage คําสั.ง .errorMessage เป็น name ของ json ในส่วนของ Backend ขึ *นกับว่าตั *งอะไรไว้
  //หากไม่มี error ส่งมาจาก Backend จะใช้ข้อความ 'เกิดข้อผิดพลาดจาก Server' แทน
  private handleError(error: any) {
    return Observable.throw(error.json().errorMessage || 'เกิดข้อผิดพลาดจาก Server');
  }


}
