import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {maskAnimations} from "../../theme/animation";

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
  animations: maskAnimations
})
export class ContactPage {

  constructor(public navCtrl: NavController) {

  }

}
