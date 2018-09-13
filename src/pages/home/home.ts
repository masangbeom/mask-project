import {Component, OnInit} from '@angular/core';
import {
  AlertController,
  NavController,
  ModalController,
  LoadingController,
  NavParams,
  Platform,
  ViewController
} from 'ionic-angular';
import {maskAnimations} from "../../theme/animation";
import {HttpProvider} from "../../providers/http/http";
import {IDust} from "../../models/iDust";
import * as moment from 'moment';
import {BluetoothSerial} from '@ionic-native/bluetooth-serial';
import {BarcodeScanner} from "@ionic-native/barcode-scanner";

moment.locale('ko');

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  animations: maskAnimations
})

export class HomePage implements OnInit {
  colorBG = '#000000';
  scannedCode = null;
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

  success = (data) => alert(data);
  fail = (error) => alert(error);


  constructor(public navCtrl: NavController, private readonly httpProvider: HttpProvider, public loadingCtrl: LoadingController,
              private bluetoothSerial: BluetoothSerial, public alertCtrl: AlertController, private barcodeScanner: BarcodeScanner,
              public modalCtrl: ModalController
  ) {
    this.bluetoothSerial.connect('00:18:E5:04:14:5B').subscribe((this.success, this.fail));
  }


  ionViewWillEnter() {
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
      if (this.dustTimeNow === undefined) {
        this.dustTimeNow = this.dustListDay
          .filter(dust => dust.dust_date_time === (timeNow - 2))[0];
      }
      this.colorBG = this.dustTimeNow.dust_state_color;
      setInterval(() => {
        if(this.dustTimeNow.dust_state === 8 || this.dustTimeNow.dust_state === 7) {
          this.bluetoothSerial.write('r').then();
        } else if(this.dustTimeNow.dust_state === 6 || this.dustTimeNow.dust_state === 5) {
          this.bluetoothSerial.write('e').then();
        } else if(this.dustTimeNow.dust_state === 4 || this.dustTimeNow.dust_state === 3) {
          this.bluetoothSerial.write('w').then();
        } else if(this.dustTimeNow.dust_state === 2 || this.dustTimeNow.dust_state === 1) {
          this.bluetoothSerial.write('q').then();
        }
      }, 360000);
    });
  }

  modalOpen(mask: number) {
    switch (mask) {
      case 1: {
        let modalOneMask = this.modalCtrl.create(ModalOneMask);
        modalOneMask.present();
        break;
      }
      case 2: {
        let modalTwoMask = this.modalCtrl.create(ModalTwoMask);
        modalTwoMask.present();
        break;
      }
      case 3: {
        let modalThreeMask = this.modalCtrl.create(ModalThreeMask);
        modalThreeMask.present();
        break;
      }
    }
  }

  buyMaskNFC(mask: number) {
    const loaderNFC = this.loadingCtrl.create({
      content: "결제 진행중... <br> NFC 리더기에 카드를 인식시켜주세요.",
    });
    loaderNFC.present();
    let nfcNumber = '';
    let countCheckNFC = 0;
    this.bluetoothSerial.write('a').then(() => {
      setTimeout(() => {
        countCheckNFC++;
        this.bluetoothSerial.available()
          .then((number: any) => {
            this.bluetoothSerial.read()
              .then((data: any) => {
                if (data[0] == "D" && data[9] == "F") {
                  nfcNumber = data[1] + data[2] + data[3] + data[4] + data[5] + data[6] + data[7] + data[8];
                  const successAlertNFC = this.alertCtrl.create({
                    title: 'NFC 확인 완료',
                    subTitle: '확인된 NFC 값 : ' + nfcNumber,
                    buttons: ['확인']
                  });
                  loaderNFC.dismiss();
                  successAlertNFC.present();
                } else {
                  const failAlertNFC = this.alertCtrl.create({
                    title: 'NFC 확인 실패',
                    subTitle: 'NFC를 인식하는 동안<br> 문제가 발생하였습니다.<br>담당자 문의 또는<br>다른 결제 방식을 선택해주세요.',
                    buttons: ['확인']
                  });
                  loaderNFC.dismiss();
                  failAlertNFC.present();
                }
              })
          })
      }, 5000);
    });
  }

  buyMaskQR(mask: number) {
    this.scannedCode = '';
    this.barcodeScanner.scan({
      preferFrontCamera: true
    }).then(barcodeData => {
      this.scannedCode = barcodeData.text;
      const successAlertQR = this.alertCtrl.create({
        title: '확인되었습니다.',
        subTitle: this.scannedCode + '님 반갑습니다.<br>' + '<br>QR코드 확인 완료 <br>잠시만 기다리시면<br>선택하신 마스크가<br>나옵니다.',
        buttons: ['확인']
      });
      successAlertQR.present();
    }, (err) => {
      const failAlertQR = this.alertCtrl.create({
        title: 'QR코드 확인 실패',
        subTitle: 'QR코드를 인식하는 동안 문제가 발생하였습니다. 담당자 문의 및 다른 결제 방식을 선택해주세요.',
        buttons: ['확인']
      });
      failAlertQR.present();
    }).then(() => {
      this.bluetoothSerial.write('b').then();
    });
  }

  showPrompt(mask: number) {
    const prompt = this.alertCtrl.create({
      title: '결제방법을 선택해주세요.',
      message: "부산대학교 학생이시라면 QR결제, 일반결제는 NFC를 추천합니다.",
      buttons: [
        {
          text: 'QR결제',
          handler: data => {
            this.buyMaskQR(mask);
          }
        },
        {
          text: 'NFC결제',
          handler: data => {
            this.buyMaskNFC(mask);
          }
        },
        {
          text: '취소',
          handler: data => {
          }
        }
      ]
    });
    prompt.present();
  }

}

@Component({
  templateUrl: 'modal-one-mask.html'
})
export class ModalOneMask {

  constructor(public platform: Platform,
              public params: NavParams,
              public viewCtrl: ViewController) {
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}

@Component({
  templateUrl: 'modal-two-mask.html'
})
export class ModalTwoMask {

  constructor(public platform: Platform,
              public params: NavParams,
              public viewCtrl: ViewController) {
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}

@Component({
  templateUrl: 'modal-three-mask.html'
})
export class ModalThreeMask {

  constructor(public platform: Platform,
              public params: NavParams,
              public viewCtrl: ViewController) {
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
