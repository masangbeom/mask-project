import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';

import {AboutPage} from '../pages/about/about';
import {ContactPage} from '../pages/contact/contact';
import {HomePage, ModalOneMask, ModalThreeMask, ModalTwoMask} from '../pages/home/home';
import {TabsPage} from '../pages/tabs/tabs';

import {
  MatCardModule, MatButtonModule
} from '@angular/material';

import { ChartsModule } from 'ng2-charts';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import { HttpProvider } from '../providers/http/http';
import {HttpClientModule} from "@angular/common/http";
import { Camera } from '@ionic-native/camera';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import {BluetoothSerial} from "@ionic-native/bluetooth-serial";
import { AngularWeatherWidgetModule, WeatherApiName } from 'angular-weather-widget';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ModalOneMask,
    ModalTwoMask,
    ModalThreeMask
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxChartsModule,
    ChartsModule,
    MatCardModule,
    MatButtonModule,
    AngularWeatherWidgetModule.forRoot({
      key: '3efbf515295a9a479474bdaece5e47fb',
      name: WeatherApiName.OPEN_WEATHER_MAP,
      baseUrl: 'http://api.openweathermap.org/data/2.5'
    }),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ModalOneMask,
    ModalTwoMask,
    ModalThreeMask
  ],
  providers: [
    StatusBar,
    BarcodeScanner,
    Camera,
    BluetoothSerial,
    SplashScreen,
    HttpClientModule,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpProvider
  ]
})
export class AppModule {
}
