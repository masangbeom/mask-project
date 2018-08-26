import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {maskAnimations} from "../../theme/animation";
import {HttpProvider} from "../../providers/http/http";
import {IDust} from "../../models/iDust";
import * as moment from 'moment';
import * as shape from 'd3-shape';

moment.locale('ko');

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  animations: maskAnimations
})

export class HomePage implements OnInit {
  colorBG = '#000000';
  dustListDay: IDust[] = [];
  dustTimeNow: IDust = {
    dust_state: undefined,
    dust_state_text: undefined,
    dust_state_color: undefined,
    dust_city: undefined,
    dust_pm10: undefined,
    dust_pm25: undefined,
    dust_date_year: undefined,
    dust_date_month: undefined,
    dust_date_day: undefined,
    dust_date_time: undefined
  };


  constructor(public navCtrl: NavController, private readonly httpProvider: HttpProvider
  ) {
    this.setDust();
  }

  ngOnInit() {

  }

  setDust() {
    const timeNow = moment().hours();
    const tempDate = (moment().format('YYYY-MM-DD')).split('-');
    this.httpProvider.getDustInfo(Number(tempDate[0]), Number(tempDate[1]), Number(tempDate[2])).subscribe((res: IDust[]) => {
      this.dustListDay = res;
      this.dustTimeNow = this.dustListDay
        .filter(dust => dust.dust_date_time === timeNow)[0];
      if (this.dustTimeNow === undefined) {
        this.dustTimeNow = this.dustListDay
          .filter(dust => dust.dust_date_time === (timeNow - 1))[0];
      }
      this.colorBG = this.dustTimeNow.dust_state_color;
    });
  }

}
