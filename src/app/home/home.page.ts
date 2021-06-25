import { Component } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private fns: AngularFireFunctions,
  ) {}

  public dates:any = [
    {date:""}
  ]

  public p:any = {}

  remove(i?) {
    let l = this.dates.length
    if(l > 1)
      this.dates.splice((i||l-1), 1)
  }

  add() {
    this.dates.push({date:""})
  }

  form(){
    return this.dates.reduce((o, d) => ({
        ...o, [d.date]: (this.p[d.date]).replace(' ', '').split(',')
    }), {})
  }

  async send() {
    const pld = this.form();
    const s = this.fns.httpsCallable('send_poundages');
    let {r, err} = await s(pld).toPromise();
    if(r){
        this.dates = [
            {date:""}
        ]
        this.p = {}
    }
    alert((r)?"Success":"Error")
  }

  show() {
    let pld = this.form()
    alert(JSON.stringify(pld))
  }

}
