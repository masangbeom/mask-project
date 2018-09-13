import {Component, OnInit, ViewChild} from '@angular/core';
import {NavController} from 'ionic-angular';
import {maskAnimations} from "../../theme/animation";
import {HttpProvider} from "../../providers/http/http";
import {IDust} from "../../models/iDust";
import * as moment from 'moment';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
  animations: maskAnimations
})
export class AboutPage {
  @ViewChild('ngxChart') private _chart;
  today = moment().format('YYYY-MM-DD');
  chartRange: string;
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
  dustChart: any = {};

  dustChartData = {
    'title': '오늘의 미세먼지 정보',
    'ranges': {
      'AM': '오전',
      'PM': '오후',
    },
    'mainChart': {
      'AM': [
        {
          'name': '1시',
          'series': [
            {
              'name': '초 미세먼지 농도',
              'value': 0
            },
            {
              'name': '미세먼지 농도',
              'value': 0
            }
          ]
        },
        {
          'name': '2시',
          'series': [
            {
              'name': '초 미세먼지 농도',
              'value': 0
            },
            {
              'name': '미세먼지 농도',
              'value': 0
            }
          ]
        },
        {
          'name': '3시',
          'series': [
            {
              'name': '초 미세먼지 농도',
              'value': 0
            },
            {
              'name': '미세먼지 농도',
              'value': 0
            }
          ]
        },
        {
          'name': '4시',
          'series': [
            {
              'name': '초 미세먼지 농도',
              'value': 0
            },
            {
              'name': '미세먼지 농도',
              'value': 0
            }
          ]
        },
        {
          'name': '5시',
          'series': [
            {
              'name': '초 미세먼지 농도',
              'value': 0
            },
            {
              'name': '미세먼지 농도',
              'value': 0
            }
          ]
        },
        {
          'name': '6시',
          'series': [
            {
              'name': '초 미세먼지 농도',
              'value': 0
            },
            {
              'name': '미세먼지 농도',
              'value': 0
            }
          ]
        },
        {
          'name': '7시',
          'series': [
            {
              'name': '초 미세먼지 농도',
              'value': 0
            },
            {
              'name': '미세먼지 농도',
              'value': 0
            }
          ]
        },
        {
          'name': '8시',
          'series': [
            {
              'name': '초 미세먼지 농도',
              'value': 0
            },
            {
              'name': '미세먼지 농도',
              'value': 0
            }
          ]
        },
        {
          'name': '9시',
          'series': [
            {
              'name': '초 미세먼지 농도',
              'value': 0
            },
            {
              'name': '미세먼지 농도',
              'value': 0
            }
          ]
        },
        {
          'name': '10시',
          'series': [
            {
              'name': '초 미세먼지 농도',
              'value': 0
            },
            {
              'name': '미세먼지 농도',
              'value': 0
            }
          ]
        },
        {
          'name': '11시',
          'series': [
            {
              'name': '초 미세먼지 농도',
              'value': 0
            },
            {
              'name': '미세먼지 농도',
              'value': 0
            }
          ]
        },
        {
          'name': '12시',
          'series': [
            {
              'name': '초 미세먼지 농도',
              'value': 0
            },
            {
              'name': '미세먼지 농도',
              'value': 0
            }
          ]
        },
      ],
      'PM': [
        {
          'name': '1시',
          'series': [
            {
              'name': '초 미세먼지 농도',
              'value': 0
            },
            {
              'name': '미세먼지 농도',
              'value': 0
            }
          ]
        },
        {
          'name': '2시',
          'series': [
            {
              'name': '초 미세먼지 농도',
              'value': 0
            },
            {
              'name': '미세먼지 농도',
              'value': 0
            }
          ]
        },
        {
          'name': '3시',
          'series': [
            {
              'name': '초 미세먼지 농도',
              'value': 0
            },
            {
              'name': '미세먼지 농도',
              'value': 0
            }
          ]
        },
        {
          'name': '4시',
          'series': [
            {
              'name': '초 미세먼지 농도',
              'value': 0
            },
            {
              'name': '미세먼지 농도',
              'value': 0
            }
          ]
        },
        {
          'name': '5시',
          'series': [
            {
              'name': '초 미세먼지 농도',
              'value': 0
            },
            {
              'name': '미세먼지 농도',
              'value': 0
            }
          ]
        },
        {
          'name': '6시',
          'series': [
            {
              'name': '초 미세먼지 농도',
              'value': 0
            },
            {
              'name': '미세먼지 농도',
              'value': 0
            }
          ]
        },
        {
          'name': '7시',
          'series': [
            {
              'name': '초 미세먼지 농도',
              'value': 0
            },
            {
              'name': '미세먼지 농도',
              'value': 0
            }
          ]
        },
        {
          'name': '8시',
          'series': [
            {
              'name': '초 미세먼지 농도',
              'value': 0
            },
            {
              'name': '미세먼지 농도',
              'value': 0
            }
          ]
        },
        {
          'name': '9시',
          'series': [
            {
              'name': '초 미세먼지 농도',
              'value': 0
            },
            {
              'name': '미세먼지 농도',
              'value': 0
            }
          ]
        },
        {
          'name': '10시',
          'series': [
            {
              'name': '초 미세먼지 농도',
              'value': 0
            },
            {
              'name': '미세먼지 농도',
              'value': 0
            }
          ]
        },
        {
          'name': '11시',
          'series': [
            {
              'name': '초 미세먼지 농도',
              'value': 0
            },
            {
              'name': '미세먼지 농도',
              'value': 0
            }
          ]
        },
        {
          'name': '12시',
          'series': [
            {
              'name': '초 미세먼지 농도',
              'value': 0
            },
            {
              'name': '미세먼지 농도',
              'value': 0
            }
          ]
        },
      ]
    }
  };

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  single = [
    {
      "name": "최고 ~ 좋음",
      "value": 894
    },
    {
      "name": "양호 ~ 보통",
      "value": 500
    },
    {
      "name": "나쁨 ~ 최악",
      "value": 720
    }
  ];



  constructor(public navCtrl: NavController, private readonly httpProvider: HttpProvider
  ) {
    this.dustChart = {
      xAxis: true,
      yAxis: true,
      gradient: true,
      legend: false,
      showXAxisLabel: false,
      xAxisLabel: '시간',
      showYAxisLabel: false,
      yAxisLabel: '농도',
      scheme: {
        domain: ['#42BFF7', '#C6ECFD', '#C7B42C', '#AAAAAA']
      },
      onSelect: (ev) => {
        console.log(ev);
      }
    };
  }

  ionViewWillEnter() {
    this.setDust();
    this.dustChart = {
      xAxis: true,
      yAxis: true,
      gradient: true,
      legend: false,
      showXAxisLabel: false,
      xAxisLabel: '시간',
      showYAxisLabel: false,
      yAxisLabel: '농도',
      scheme: {
        domain: ['#42BFF7', '#C6ECFD', '#C7B42C', '#AAAAAA']
      },
      onSelect: (ev) => {
        console.log(ev);
      }
    };
  }


  setDust() {
    const timeNow = moment().hours();
    if (timeNow < 12) {
      this.chartRange = 'AM'
    } else {
      this.chartRange = 'PM'
    }
    const tempDate = (moment().format('YYYY-MM-DD')).split('-');
    this.httpProvider
      .getDustInfo(Number(tempDate[0]), Number(tempDate[1]), Number(tempDate[2]))
      .subscribe((res: IDust[]) => {
          this.dustListDay = res;
          for (let i = 0; i < this.dustListDay.length; i++) {
            switch (this.dustListDay[i].dust_date_time) {
              case 1: {
                this.dustChartData.mainChart.AM[0].series[0].value = this.dustListDay[i].dust_pm25;
                this.dustChartData.mainChart.AM[0].series[1].value = this.dustListDay[i].dust_pm10;
                break;
              }
              case 2: {
                this.dustChartData.mainChart.AM[1].series[0].value = this.dustListDay[i].dust_pm25;
                this.dustChartData.mainChart.AM[1].series[1].value = this.dustListDay[i].dust_pm10;
                break;
              }
              case 3: {
                this.dustChartData.mainChart.AM[2].series[0].value = this.dustListDay[i].dust_pm25;
                this.dustChartData.mainChart.AM[2].series[1].value = this.dustListDay[i].dust_pm10;
                break;
              }
              case 4: {
                this.dustChartData.mainChart.AM[3].series[0].value = this.dustListDay[i].dust_pm25;
                this.dustChartData.mainChart.AM[3].series[1].value = this.dustListDay[i].dust_pm10;
                break;
              }
              case 5: {
                this.dustChartData.mainChart.AM[4].series[0].value = this.dustListDay[i].dust_pm25;
                this.dustChartData.mainChart.AM[4].series[1].value = this.dustListDay[i].dust_pm10;
                break;
              }
              case 6: {
                this.dustChartData.mainChart.AM[5].series[0].value = this.dustListDay[i].dust_pm25;
                this.dustChartData.mainChart.AM[5].series[1].value = this.dustListDay[i].dust_pm10;
                break;
              }
              case 7: {
                this.dustChartData.mainChart.AM[6].series[0].value = this.dustListDay[i].dust_pm25;
                this.dustChartData.mainChart.AM[6].series[1].value = this.dustListDay[i].dust_pm10;
                break;
              }
              case 8: {
                this.dustChartData.mainChart.AM[7].series[0].value = this.dustListDay[i].dust_pm25;
                this.dustChartData.mainChart.AM[7].series[1].value = this.dustListDay[i].dust_pm10;
                break;
              }
              case 9: {
                this.dustChartData.mainChart.AM[8].series[0].value = this.dustListDay[i].dust_pm25;
                this.dustChartData.mainChart.AM[8].series[1].value = this.dustListDay[i].dust_pm10;
                break;
              }
              case 10: {
                this.dustChartData.mainChart.AM[9].series[0].value = this.dustListDay[i].dust_pm25;
                this.dustChartData.mainChart.AM[9].series[1].value = this.dustListDay[i].dust_pm10;
                break;
              }
              case 11: {
                this.dustChartData.mainChart.AM[10].series[0].value = this.dustListDay[i].dust_pm25;
                this.dustChartData.mainChart.AM[10].series[1].value = this.dustListDay[i].dust_pm10;
                break;
              }
              case 12: {
                this.dustChartData.mainChart.AM[11].series[0].value = this.dustListDay[i].dust_pm25;
                this.dustChartData.mainChart.AM[11].series[1].value = this.dustListDay[i].dust_pm10;
                break;
              }
              case 13: {
                this.dustChartData.mainChart.PM[0].series[0].value = this.dustListDay[i].dust_pm25;
                this.dustChartData.mainChart.PM[0].series[1].value = this.dustListDay[i].dust_pm10;
                break;
              }
              case 14: {
                this.dustChartData.mainChart.PM[1].series[0].value = this.dustListDay[i].dust_pm25;
                this.dustChartData.mainChart.PM[1].series[1].value = this.dustListDay[i].dust_pm10;
                break;
              }
              case 15: {
                this.dustChartData.mainChart.PM[2].series[0].value = this.dustListDay[i].dust_pm25;
                this.dustChartData.mainChart.PM[2].series[1].value = this.dustListDay[i].dust_pm10;
                break;
              }
              case 16: {
                this.dustChartData.mainChart.PM[3].series[0].value = this.dustListDay[i].dust_pm25;
                this.dustChartData.mainChart.PM[3].series[1].value = this.dustListDay[i].dust_pm10;
                break;
              }
              case 17: {
                this.dustChartData.mainChart.PM[4].series[0].value = this.dustListDay[i].dust_pm25;
                this.dustChartData.mainChart.PM[4].series[1].value = this.dustListDay[i].dust_pm10;
                break;
              }
              case 18: {
                this.dustChartData.mainChart.PM[5].series[0].value = this.dustListDay[i].dust_pm25;
                this.dustChartData.mainChart.PM[5].series[1].value = this.dustListDay[i].dust_pm10;
                break;
              }
              case 19: {
                this.dustChartData.mainChart.PM[6].series[0].value = this.dustListDay[i].dust_pm25;
                this.dustChartData.mainChart.PM[6].series[1].value = this.dustListDay[i].dust_pm10;
                break;
              }
              case 20: {
                this.dustChartData.mainChart.PM[7].series[0].value = this.dustListDay[i].dust_pm25;
                this.dustChartData.mainChart.PM[7].series[1].value = this.dustListDay[i].dust_pm10;
                break;
              }
              case 21: {
                this.dustChartData.mainChart.PM[8].series[0].value = this.dustListDay[i].dust_pm25;
                this.dustChartData.mainChart.PM[8].series[1].value = this.dustListDay[i].dust_pm10;
                break;
              }
              case 22: {
                this.dustChartData.mainChart.PM[9].series[0].value = this.dustListDay[i].dust_pm25;
                this.dustChartData.mainChart.PM[9].series[1].value = this.dustListDay[i].dust_pm10;
                break;
              }
              case 23: {
                this.dustChartData.mainChart.PM[10].series[0].value = this.dustListDay[i].dust_pm25;
                this.dustChartData.mainChart.PM[10].series[1].value = this.dustListDay[i].dust_pm10;
                break;
              }
              case 24: {
                this.dustChartData.mainChart.PM[11].series[0].value = this.dustListDay[i].dust_pm25;
                this.dustChartData.mainChart.PM[11].series[1].value = this.dustListDay[i].dust_pm10;
                break;
              }
            }
          }
          console.log(this.dustChartData.mainChart);
          this._chart.results = this.dustChartData.mainChart[this.chartRange];
          // console.log(this._chart.results);
          this.dustTimeNow = this.dustListDay
            .filter(dust => dust.dust_date_time === timeNow)[0];
          if (this.dustTimeNow === undefined) {
            this.dustTimeNow = this.dustListDay
              .filter(dust => dust.dust_date_time === (timeNow - 1))[0];
          }
          if (this.dustTimeNow === undefined) {
            this.dustTimeNow = this.dustListDay
              .filter(dust => dust.dust_date_time === (timeNow - 2))[0];
          }
          this.colorBG = this.dustTimeNow.dust_state_color;
        }
      );
  }

}
