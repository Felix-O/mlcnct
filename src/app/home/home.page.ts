import { Component } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { stringify } from 'querystring';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private fns: AngularFireFunctions) {}

  public dates:any = [
    {date:""}
  ]

  public p:any = {}

  async send() {
    let s = this.fns.httpsCallable('send_poundages');
    await s(this.p).toPromise();
  }

  show() {
    let pld = this.dates.reduce((o, d) => ({ ...o, [d.date]: this.p[d.date]}), {})
    alert(JSON.stringify(pld))
  }

}
