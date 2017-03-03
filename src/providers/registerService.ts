import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/Observable/throw';
import { AuthModel } from '../models/AuthModel';

@Injectable()
export class RegisterService {

  constructor(public http: Http) { }

  //function login provide 3 parameter and return AuthModel data
  public register(username: string, email: string, password: string): Observable<AuthModel> {

    let AuthHeader = new Headers();
    AuthHeader.append('Content-Type', 'application/json'); //define header

    //declare data to store input data
    let data = {
      'username': username,
      'email': email,
      'password': password
    }

    //use method post() to send data to login
    return this.http.post('http://nel009.dcs.corp/flashchat/register.php', data, { headers: AuthHeader })
      .map((res: Response) => {
        let data = res.json(); ////get json data from backend and return to page
        return data;
      }).catch(this.handleError);
  }

  private handleError(error: any) {
    return Observable.throw(error.json().errorMessage || 'Failed From Server');
  }


}



