import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the HttpProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpProvider {

  endPoint = 'http://52.79.62.251';

  constructor(public http: HttpClient) {
  }

  getDustInfo(year: number, month: number, day: number) {
    return this.http.post(this.endPoint + '/dust/dustInfo/', {
      year: year,
      month: month,
      day: day
    });
  }

}
