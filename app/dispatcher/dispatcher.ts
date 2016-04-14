import { Injectable } from 'angular2/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class Dispatcher {
  public dispatcher$: Subject<Object>;

  constructor() {
    this.dispatcher$ = new Subject();
  }

  dispatch(action$) {
    action$.subscribe(
      res => this.dispatcher$.next(res),
      error => console.error('🔥', error),
      () => console.log('done')
    );
  }
}
