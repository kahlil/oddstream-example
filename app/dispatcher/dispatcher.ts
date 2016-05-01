import { Injectable } from 'angular2/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class Dispatcher {
  public dispatcher$: any;

  constructor() {
    this.dispatcher$ = new Subject();
  }

  dispatch(action$) {
    action$.subscribe(
      res => this.dispatcher$.next(res),
      error => console.error('🔥', error),
      () => console.log('a completed event has been sent')
    );

    // this.dispatcher$ = Observable.merge(
    //   this.dispatcher$,
    //   action$
    // );

    // this.dispatcher$.subscribe(x => console.log(x))
  }
}
