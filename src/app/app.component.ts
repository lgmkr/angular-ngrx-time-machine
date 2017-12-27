import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/withLatestFrom';
import { Subject } from 'rxjs/Subject';
import { Store } from '@ngrx/store';
import { HOUR, SECOND, ADVANCE, RECALL } from './reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  click$ = new Subject()
    // tslint:disable-next-line:radix
    .map((v: string) => ({ type: HOUR, payload: parseInt(v) }));

  recall$ = new Subject();

  seconds$ = Observable
    .interval(1000)
    .mapTo({ type: SECOND, payload: 1 });

  person$ = new Subject()
    .map((value) => ({ payload: value, type: ADVANCE }));

  public time;
  public people;

  constructor(private store: Store<any>) {
    this.time = this.store.select('clock');
    this.people = this.store.select('people');


    Observable.merge(
      this.click$,
      this.seconds$,
      this.person$,
      this.recall$
        .withLatestFrom(this.time, (_, y) => y)
        .map((time) => ({ type: RECALL, payload: time }))
    )
      .subscribe(store.dispatch.bind(store));
  }
}
