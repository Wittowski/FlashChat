import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/Observable/throw';
import { FeedbackModel } from '../models/FeedbackModel';

/*
  Generated class for the SearchService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class SearchService {

  constructor(public http: Http) {  }

  //function login provide 2 parameter and return FeedbackModel data
  public search(user: string): Observable<FeedbackModel> {

    let AuthHeader = new Headers();
    AuthHeader.append('Content-Type', 'application/json'); //define header

    //declare data to store input data
    let data = {
      'user': user
    }

    //use method post() to send data to login
    return this.http.post('http://nel009.dcs.corp/flashchat/search.php', data, { headers: AuthHeader })
      .map((res: Response) => {
        let data = res.json(); ////get json data from backend and return to page
        return data;
      }).catch(this.handleError);
  }

  private handleError(error: any) {
    return Observable.throw(error.json().errorMessage || 'Server does not connected');
  }

}
