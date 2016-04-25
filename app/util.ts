// import { SimpleChange } from 'angular2/core';
import { Observable, Observer } from 'rxjs/Rx';
import { curry, camelCase, last } from 'lodash';

export function makeReducer$(dispatcher$: Observable<{ type: string }>, reducers: Object, actionType: string) {
  const mapReducer = action => curry(reducers[camelCase(action.type)])(action);
  return dispatcher$
    .filter(action => action.type === actionType)
    .map(mapReducer);
}

export function makeObservableFunction<T>(target: any, functionName: string) {
    let observer: Observer<any>;
    const observable = Observable.create(obs => observer = obs);
    target[functionName] = function() {
        const len = arguments.length;
        if (len === 1) {
            observer.next(arguments[0]);
        } else {
            const args = new Array(len);
            for (let i = 0; i < len; i++) {
                args[i] = arguments[i];
            }
            observer.next(args);
        }
    }
    return observable;
}
